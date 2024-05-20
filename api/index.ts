import axios, { AxiosError } from 'axios'

export type ResponseBody<T> = {
  err: boolean
  errMsg?: string
  data?: T
  status?: number
}

type Response<T> = Promise<ResponseBody<T>>

class Client {
  async get<T>(url: string): Response<T> {
    try {
      const resp = await axios.get<T>(url)
      if (!resp.data) throw showError({ statusCode: 500, statusMessage: 'Server error', fatal: true })

      return {
        err: false,
        data: resp.data,
        status: resp.status
      }
    } catch (err: any) {
      const error = err as AxiosError
      console.log('error.response ', error.response)
      return {
        err: true,
        status: error.status
      }
    }
  }

  async post<T>(url: string, body: object): Response<T> {
    try {
      const resp = await axios.post<T>(url, body)
      if (!resp.data) throw showError({ statusCode: 500, statusMessage: 'Server error', fatal: true })

      return {
        err: false,
        data: resp.data,
        status: resp.status
      }
    } catch (err: any) {
      const error = err as AxiosError
      console.log('error.response ', error.response)
      return {
        err: true,
        status: error.status
      }
    }
  }
}

const client = new Client()

export default client
export { swapClient } from './swap'
