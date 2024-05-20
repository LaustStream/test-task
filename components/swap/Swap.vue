<template>
  <SwapMain class="swap">
    <SwapTimer class="swap__timer" />
    <SwapCurrencyAmount
      type="FROM"
      class="swap__currency-amount from"
      :currency="currencyFrom"
      placeholder="Вы отправляете"
    />
    <div class="swap__row swap__row_rate-reverse">
      <SwapRate class="swap__rate" />
      <SwapReverse />
    </div>
    <SwapCurrencyAmount
      type="TO"
      class="swap__currency-amount to"
      :currency="currencyTo"
      placeholder="Вы получаете"
      :disabled="true"
      prefix="~"
    />
    <SwapTotal class="swap__total" />
    <SwapButton />
  </SwapMain>
</template>
<script lang="ts" setup>
  const swap = useSwapStore()

  const { currencyFrom, currencyTo } = storeToRefs(swap)

  await swap.init()
</script>
<style lang="scss" scoped>
  .swap {
    &__timer {
      margin-bottom: $margin-2xl;
    }
    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__row_rate-reverse {
      margin-bottom: $margin-lg;
    }
    &__currency-amount.from {
      margin-bottom: $margin-lg;
    }
    &__currency-amount.to {
      margin-bottom: $margin-2xl;
    }
    &__total {
      margin-bottom: $margin-2xl;
    }
  }
</style>
