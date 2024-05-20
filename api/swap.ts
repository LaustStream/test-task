import { API_URL } from '@/configs/app.config'
import client from '.'
import type { ICalculationRequest, ICalculation } from '@/types/swap'
import type { ICurrency } from '@/types/currency'

const CURRENCIES_ENDPOINT = API_URL + '/currencies'
const EXCHANGE_RATE_CALCULATE_ENDPOINT = API_URL + '/exchange/rate/calculate'

class SwapClient {
  async getCurrencies() {
    return client.get<ICurrency[]>(CURRENCIES_ENDPOINT)
  }

  async postExchangeRateCalculate(body: ICalculationRequest) {
    return client.post<ICalculation>(EXCHANGE_RATE_CALCULATE_ENDPOINT, body)
  }
}

export default SwapClient

export const swapClient = new SwapClient()
