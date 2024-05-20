<template>
  <UiIconButton iconName="arrow-change-vert" @click="handleClick" :disabled="isOutdatedRate" />
</template>
<script lang="ts" setup>
  const swapStore = useSwapStore()

  const { isOutdatedRate } = storeToRefs(swapStore)

  const handleClick = () => swapStore.reversePair()
</script>
