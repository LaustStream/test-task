import { type NuxtError } from 'nuxt/app'

const ERRORS = {
  500: {
    statusCode: 500,
    statusMessage: 'Server error',
    fatal: true
  },
  406: {
    statusCode: 406,
    statusMessage: 'Default currencies pair are wrong',
    fatal: true
  },
  SWAP_INIT: {
    statusCode: 406,
    statusMessage: 'Swap store not initialized',
    fatal: true
  }
}

export default ERRORS
