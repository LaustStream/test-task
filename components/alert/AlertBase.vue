<template>
  <div class="alert-base">
    <div class="alert-base__content">
      <div class="alert-base__row">
        <UiIcon v-if="iconName" class="alert-base__icon" :name="iconName" />
        <UiTypography class="alert-base__text" level="b3" weight="500">
          <slot name="text" />
        </UiTypography>
      </div>
      <div v-if="$slots.controls" class="alert-base__row">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps({
    iconName: { type: String }
  })
</script>
<style lang="scss" scoped>
  .alert-base {
    position: fixed;
    width: 100%;
    bottom: 12px;
    display: flex;
    justify-content: center;
    &__content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $size-14;
      max-width: 1232px;
      border: 1px solid $color-border-light;
      border-radius: $radius-md;

      padding: 0 12px;
      box-shadow: 0px 4px 24px 0px #20202014;
    }
    &__icon {
      width: 24px;
      height: 24px;
    }
    &__row {
      display: flex;
      align-items: center;
      gap: 0 $gap-sm;
    }
    &__text {
      color: $color-text-primary;
    }
  }
</style>
