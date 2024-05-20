<template>
  <div class="swap-total">
    <div class="swap-total__row">
      <div class="swap-total__trade">
        <UiTypography level="b3">Обмен</UiTypography>
        <OtherSwapTotal :from="from" :to="to" seperater="→" :loading="isOutdatedRate" />
      </div>
      <div class="swap-total__details-dropdown">
        <UiTextToggle v-model="isDetailsActive" :disabled="isOutdatedRate">Детализация</UiTextToggle>
      </div>
    </div>
    <SwapTotalDetails v-show="isDetailsActive && !isOutdatedRate" class="swap-total__details" />
  </div>
</template>
<script lang="ts" setup>
  const swapStore = useSwapStore()
  const { formattedInputAmount, formattedOutputAmount, currencyFrom, currencyTo, isOutdatedRate } =
    storeToRefs(swapStore)

  const isDetailsActive = ref(false)

  const from = computed(() => `${formattedInputAmount.value || '0'} ${currencyFrom.value.code}`)
  const to = computed(() => `${formattedOutputAmount.value} ${currencyTo.value.code}`)
</script>
<style lang="scss" scoped>
  .swap-total {
    &__trade {
      display: flex;
      gap: 0 $gap-xs;
    }
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__details {
      margin-top: $margin-2xl;
    }
  }
</style>
