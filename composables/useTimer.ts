import { toDate, intervalToDuration, isPast, isBefore, addSeconds } from 'date-fns'

const DEFAULT_TIMER = {
  seconds: '00',
  minutes: '00'
}

interface TimerType {
  minutes: string
  seconds: string
}

const useTimer = () => {
  let timerInterval: NodeJS.Timeout
  const timer = ref(DEFAULT_TIMER)
  const endDate = ref()
  const isDone = ref(false)

  const formatDurationItem = (item: number | undefined) => {
    if (!item) return '00'
    else if (item < 10) return '0' + item
    else return item.toString()
  }

  const init = (endTime: number) => {
    const now = Date.now()
    isDone.value = false
    endTime = addSeconds(endTime, 2).getTime()
    endDate.value = endTime

    if (isBefore(endTime, now)) {
      isDone.value = true
      return
    }

    clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      const now = Date.now()
      const duration = intervalToDuration({
        start: now,
        end: endTime
      })

      const formattedTimer: TimerType = {
        minutes: formatDurationItem(duration.minutes),
        seconds: formatDurationItem(duration.seconds)
      }

      if (isBefore(endTime, now)) {
        isDone.value = true
        clearInterval(timerInterval)
        return
      }

      timer.value = formattedTimer
    }, 1000)
  }

  const updateEndTime = (endTime: number) => {
    clearInterval(timerInterval)
    init(endTime)
  }

  const stopTimer = () => {
    clearInterval(timerInterval)
    timer.value = DEFAULT_TIMER
    endDate.value = undefined
    isDone.value = false
  }

  const formattedTimer = computed(() => `${timer.value.minutes}:${timer.value.seconds}`)

  return { init, timer, updateEndTime, stopTimer, isDone, formattedTimer }
}

export default useTimer
