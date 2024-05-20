<template>
  <div class="swap-rate">
    <OtherSwapTotal :from="from" :to="to" seperater="~" :loading="isOutdatedRate" :size="size" />
  </div>
</template>
<script lang="ts" setup>
  import { type OtherSwapTotalSize } from '@/types/ui'

  defineProps({
    size: {
      type: String as PropType<OtherSwapTotalSize>,
      default: 'lg'
    }
  })

  const swapStore = useSwapStore()
  const { currencyCrypto, rateCalculation, isOutdatedRate } = storeToRefs(swapStore)
  const formatedTotal = computed(() => formatAmount(rateCalculation.value.rate))

  const from = computed(() => `1 ${currencyCrypto.value.code}`)
  const to = computed(() => `${formatedTotal.value} ${currencyCrypto.value.code}`)
</script>
