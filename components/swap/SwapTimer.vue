<template>
  <div class="swap-timer">
    <UiTypography class="swap-timer__text" level="b2">
      Курс обновится через <b>{{ timer }}</b>
    </UiTypography>
  </div>
</template>
<script lang="ts" setup>
  const swapStore = useSwapStore()
  const { timer } = storeToRefs(swapStore)
</script>
<style lang="scss" scoped>
  .swap-timer {
    &__text b {
      font-weight: 600;
      color: $color-black;
    }
  }
</style>
