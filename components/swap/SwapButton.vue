<template>
  <UiButton @click="handleClick" :disabled="isOutdatedRate">Начать сделку</UiButton>
</template>
<script lang="ts" setup>
  const swapStore = useSwapStore()
  const { isOutdatedRate } = storeToRefs(swapStore)

  const handleClick = () => {
    // TODO: Add logic
    console.log('Swap button clicked')
  }
</script>
<style lang="scss" scoped></style>
