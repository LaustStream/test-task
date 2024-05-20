<template>
  <div class="swap-total-details">
    <div class="swap-total-details__item">
      <UiTypography level="b3" weight="500">Курс обмена</UiTypography>
      <SwapRate size="sm" />
    </div>
    <div class="swap-total-details__item">
      <UiTypography level="b3" weight="500">Комиссия платформы, {{ rateCalculation.fee.percent }}%</UiTypography>
      <UiTypography level="b3" weight="600">{{ rateCalculation.fee.amount }} {{ currencyFiat.code }}</UiTypography>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const swapStore = useSwapStore()
  const { currencyFiat, rateCalculation } = storeToRefs(swapStore)
</script>
<style lang="scss" scoped>
  .swap-total-details {
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $margin-lg;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
