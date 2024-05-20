<template>
  <div class="swap-main">
    <div class="swap-main__body">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.swap-main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__body {
    width: 560px;
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    padding: $padding-3xl;
    box-shadow: 0px 4px 20px 0px #2020200d;
  }
}
</style>
