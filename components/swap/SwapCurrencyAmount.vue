<template>
  <div class="swap-currency-amount">
    <UiInput
      class="swap-currency-amount__input"
      v-model="amountProxy"
      :label="placeholder"
      placeholder="10 000"
      :disabled="disabled"
      :type="InputType.AMOUNT"
      :amount-accuracy="currency.mapping_accuracy"
      :prefix="prefix"
      :loading="isOutdatedRate"
    />
    <UiDropdown
      class="swap-currency-amount__dropdown"
      v-model="currencyProxy"
      :items="list"
      :loading="isOutdatedRate"
    />
    <div v-if="isRequiredMin" class="swap-currency-amount__min-amount-validation">
      <UiTypography level="b3" weight="500">
        Минимальная сумма: <span>{{ formatAmount(currency.min_limit) }} {{ currency.code }}</span>
      </UiTypography>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue'
  import { CURRENCY_TYPE, type ICurrency } from '@/types/currency'
  import { SwapType } from '@/types/swap'
  import { InputType } from '@/types/ui'
  import Decimal from 'decimal.js'

  const swapStore = useSwapStore()
  const { inputAmount, outputAmount, isOutdatedRate } = storeToRefs(swapStore)

  const props = defineProps({
    type: {
      type: String as PropType<SwapType>,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      default: ''
    },
    currency: {
      type: Object as PropType<ICurrency>,
      required: true
    },
    disabled: {
      type: Boolean
    },
    prefix: {
      type: String
    }
  })

  const amountProxy = computed({
    get() {
      return props.type === SwapType.FROM ? inputAmount.value : outputAmount.value
    },
    set(val) {
      if (props.type === SwapType.FROM) {
        swapStore.setInputAmount(val)
      }
    }
  })

  const currencyProxy = computed({
    get() {
      return {
        value: props.currency,
        name: props.currency.code,
        subText: props.currency.network,
        label: props.currency.name,
        icon: props.currency.icon_file.url
      }
    },
    set(val) {
      props.type === SwapType.FROM ? swapStore.setCurrencyFrom(val.value) : swapStore.setCurrencyTo(val.value)
    }
  })

  const list = computed(() => {
    const currenciesByType =
      props.currency.type === CURRENCY_TYPE.CRYPTO ? swapStore.cryptoCurrencies : swapStore.fiatCurrencies

    return currenciesByType.map((currency) => ({
      value: currency,
      name: currency.code,
      subText: currency.network,
      label: currency.name,
      icon: currency.icon_file.url
    }))
  })

  const isRequiredMin = computed(() => {
    const isFrom = props.type === SwapType.FROM
    const cleanedAmount = cleanAmount(amountProxy.value)
    const isLessMin = new Decimal(cleanedAmount || 0).lessThan(props.currency.min_limit)

    return isFrom && isLessMin
  })
</script>
<style lang="scss" scoped>
  .swap-currency-amount {
    position: relative;
    display: flex;
    &__input {
      width: 100%;
      border-radius: $radius-lg 0 0 $radius-lg;
      border-right: 1px solid $color-border;
    }
    &__dropdown {
      flex-shrink: 0;
      border-radius: 0 $radius-lg $radius-lg 0;
      width: 240px;
    }
    &__min-amount-validation {
      position: absolute;
      width: 100%;
      padding: $padding-2sm $padding-xl;
      top: calc(100% + 4px);
      left: 0;
      background: $color-surface-warning;
      border-radius: $radius-md;
      color: $color-text-primary;
      span {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: $color-text-primary;
        }
      }
    }
  }
</style>
