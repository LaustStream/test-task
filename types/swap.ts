export enum SwapType {
  FROM = 'FROM',
  TO = 'TO'
}

interface IFee {
  // сумма комиссии
  amount?: string

  // процент комиссии (от суммы перевода)
  percent: number

  // базовый процент комиссии (комиссию можно кастомизировать)
  basePercent: number
}

export interface ICalculation {
  // сумма, которую получит клиент
  amount?: string

  // сумма, которую отправит клиент
  amountFrom: string

  // идентификатор валюты, которую отправит клиент
  currencyFromId: string

  // идентификатор валюты, которую получит клиент
  currencyToId: string

  // комиссия
  fee: IFee

  // курс обмена (всегда крипто к фиату!)
  rate?: string
}

export interface ICalculationRequest {
  // сумма к обмену
  amount: number

  // валюта, которую меняем
  currency_from_id?: string

  // валюта, на которую меняем
  currency_to_id?: string
}
