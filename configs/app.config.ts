const envs = import.meta.env

export const API_URL = envs.VITE_API_URL
export const DEFAULT_PAIR: [string, string] = ['USD', 'BTC']
export const DEFAULT_INPUT_AMOUNT = '10000'
