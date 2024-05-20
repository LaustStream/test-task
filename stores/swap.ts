import isEqual from 'lodash/isEqual'
import { swapClient } from '@/api'
import ERRORS from '@/configs/errors.config'
import { CURRENCY_TYPE, type ICurrency } from '@/types/currency'
import { DEFAULT_PAIR, DEFAULT_INPUT_AMOUNT } from '@/configs/app.config'
import type { ICalculation } from '~/types/swap'
import { addSeconds } from 'date-fns'
import { AlertName } from '~/types/alert'

const UPDATE_RATE_TIME_SECONDS = 60

export const useSwapStore = defineStore('swap', () => {
  const currencies = ref<ICurrency[]>([])
  const pair = ref<[ICurrency, ICurrency]>()
  const rateCalculation = ref<ICalculation>()
  const inputAmount = ref(DEFAULT_INPUT_AMOUNT)
  const isOutdatedRate = ref(false)
  let rateCalculationTimeout: NodeJS.Timeout

  const timer = useTimer()
  const alertStore = useAlertStore()

  const fetchRateCalculation = async () => {
    if (!pair.value) return

    const cleanedAmount = cleanAmount(inputAmount.value)
    const calculationResponse = await swapClient.postExchangeRateCalculate({
      amount: Number(cleanedAmount),
      currency_from_id: pair.value[0].id,
      currency_to_id: pair.value[1].id
    })

    if (calculationResponse.status === 206) {
      isOutdatedRate.value
      timer.stopTimer()
      alertStore.setActiveAlert(AlertName.OUTDATED)
    } else {
      refreshTimer()
    }

    if (calculationResponse.err || !calculationResponse.data) {
      throw showError(ERRORS[500])
    }

    if (!calculationResponse.data.amount) {
      throw showError(ERRORS[500])
    }

    rateCalculation.value = calculationResponse.data
  }

  const fetchRateCalculationWithTimeout = () => {
    clearTimeout(rateCalculationTimeout)
    rateCalculationTimeout = setTimeout(fetchRateCalculation, 500)
  }

  const initPairs = async (curencies: ICurrency[]) => {
    const currencyFrom = currencies.value.find((currency) => currency.code === DEFAULT_PAIR[0])
    const currencyTo = currencies.value.find((currency) => currency.code === DEFAULT_PAIR[1])
    if (currencyFrom?.type === 'FIAT' && currencyTo?.type === 'FIAT') throw showError(ERRORS[406])
    if (currencyFrom?.type === 'CRYPTO' && currencyTo?.type === 'CRYPTO') throw showError(ERRORS[406])

    if (!currencyFrom || !currencyTo) throw showError(ERRORS['SWAP_INIT'])

    pair.value = [currencyFrom, currencyTo]

    await fetchRateCalculation()
    timer.init(addSeconds(new Date(), UPDATE_RATE_TIME_SECONDS).getTime())
  }

  const init = async () => {
    const currenciesResponse = await swapClient.getCurrencies()
    if (currenciesResponse.err || !currenciesResponse.data) {
      throw showError(ERRORS[500])
    }
    currencies.value = currenciesResponse.data

    await initPairs(currenciesResponse.data)

    return currenciesResponse
  }

  const reversePair = () => {
    if (!pair.value) throw showError(ERRORS['SWAP_INIT'])
    pair.value = [pair.value[1], pair.value[0]]
    // This method to optimize queries to API. So actually its depends on back-end cache.
    // fetchRateCalculationWithTimeout()
    fetchRateCalculation()
  }

  const setCurrencyFrom = (currency: ICurrency) => {
    if (!pair.value) throw showError(ERRORS['SWAP_INIT'])
    if (isEqual(pair.value[0], currency)) return
    pair.value = [currency, pair.value[1]]
    fetchRateCalculation()
  }

  const setCurrencyTo = (currency: ICurrency) => {
    if (!pair.value) throw showError(ERRORS['SWAP_INIT'])
    if (isEqual(pair.value[1], currency)) return
    pair.value = [pair.value[0], currency]
    fetchRateCalculation()
  }

  const setInputAmount = (amount: string) => {
    inputAmount.value = amount
    if (amount === '' || amount === '0') {
      return
    }

    fetchRateCalculationWithTimeout()
  }

  const refreshTimer = () => {
    timer.updateEndTime(addSeconds(new Date(), UPDATE_RATE_TIME_SECONDS).getTime())
  }

  const formattedInputAmount = computed(() => {
    return formatAmount(inputAmount.value, currencyFrom.value?.mapping_accuracy)
  })

  const formattedOutputAmount = computed(() => {
    if (!outputAmount.value) return ''
    return formatAmount(outputAmount.value, currencyTo.value?.mapping_accuracy)
  })

  const outputAmount = computed(() => {
    if (!rateCalculation.value) throw showError(ERRORS['SWAP_INIT'])
    if (inputAmount.value === '0' || inputAmount.value === '') return '0'
    return rateCalculation.value.amount
  })

  const fiatCurrencies = computed(() => currencies.value.filter((currency) => currency.type === CURRENCY_TYPE.FIAT))
  const cryptoCurrencies = computed(() => currencies.value.filter((currency) => currency.type === CURRENCY_TYPE.CRYPTO))

  const currencyFrom = computed(() => (pair.value ? pair.value[0] : null))
  const currencyTo = computed(() => (pair.value ? pair.value[1] : null))

  const currencyCrypto = computed(() => {
    if (!pair.value) throw showError(ERRORS['SWAP_INIT'])
    return pair.value[0].type === CURRENCY_TYPE.CRYPTO ? pair.value[0] : pair.value[1]
  })

  const currencyFiat = computed(() => {
    if (!pair.value) throw showError(ERRORS['SWAP_INIT'])
    return pair.value[0].type === CURRENCY_TYPE.FIAT ? pair.value[0] : pair.value[1]
  })

  watch(
    timer.isDone,
    (done) => {
      if (done) {
        fetchRateCalculationWithTimeout()
        timer.updateEndTime(addSeconds(new Date(), UPDATE_RATE_TIME_SECONDS).getTime())
      }
    },
    { immediate: true }
  )

  return {
    init,
    currencies,
    isOutdatedRate,
    rateCalculation,
    inputAmount,
    outputAmount,
    formattedInputAmount,
    formattedOutputAmount,
    fiatCurrencies,
    cryptoCurrencies,
    currencyFiat,
    currencyCrypto,
    currencyFrom,
    currencyTo,
    reversePair,
    setCurrencyFrom,
    setCurrencyTo,
    setInputAmount,
    timer: timer.formattedTimer
  }
})
