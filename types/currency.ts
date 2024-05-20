export enum CURRENCY_TYPE {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO'
}

enum FIAT_TYPE {
  INTERNATIONAL = 'INTERNATIONAL',
  CIS = 'CIS'
}

enum CRYPTO_ADDRESS_VALIDATOR {
  BTC_ADDRESS = 'BTC_ADDRESS',
  ERC_ADDRESS = 'ERC_ADDRESS',
  TRC_ADDRESS = 'TRC_ADDRESS'
}

interface IFile {
  // id файла
  fileId: string

  // размер файла в байтах
  fileSize: number

  // ссылка по которой можно получить файл
  url: string
}

export interface ICurrency {
  // идентификатор валюты
  id: string

  // тип валюты
  type: CURRENCY_TYPE

  // название валюты
  name: string

  // код валюты
  code: string

  // сеть (только для крипто-валют)
  network?: string

  // иконка валюты
  icon_file: IFile

  // тип фиатной валюты (только для фиатных валют)
  fiatType?: FIAT_TYPE

  // по этому правилу проверяется крипто адрес (только для крипто-валют)
  addressValidationRule?: CRYPTO_ADDRESS_VALIDATOR

  // количество знаков после запятой, которые необходимо отображать
  mapping_accuracy: number

  // минимальный лимит на обмен (меньше этой суммы обмен не доступен)
  min_limit: string
}
