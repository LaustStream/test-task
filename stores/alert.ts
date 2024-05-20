import { type AlertName } from '@/types/alert'

interface State {
  activeAlert: AlertName | null
}

export const useAlertStore = defineStore('alert', () => {
  const activeAlert = ref<AlertName | null>(null)

  const setActiveAlert = (name: AlertName) => {
    activeAlert.value = name
  }

  return { activeAlert, setActiveAlert }
})
