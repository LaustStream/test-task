<template>
  <UiWrapper class="ui-button" :class="computedClasses" :link="link">
    <slot />
  </UiWrapper>
</template>
<script lang="ts" setup>
  import type { ButtonSize, ButtonType } from '@/types/ui'

  const props = defineProps({
    link: {
      type: String,
      default: undefined
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'lg'
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    }
  })

  const computedClasses = computed(() => {
    return [props.size, props.type]
  })
</script>
<style lang="scss" scoped>
  .ui-button {
    width: 100%;
    border: 0;
    font-weight: 500;
    &.lg {
      height: $size-14;
      padding: 0 24px;
      border-radius: $radius-md;
      @include text-base-1;
    }
    &.sm {
      height: $size-8;
      padding: 0 12px;
      border-radius: $radius-sm;
      @include text-base-3;
    }
    &.primary {
      background: $color-surface-black;
      color: $color-text-invert;
    }
    &.secondary {
      background: $color-surface-gray;
      color: $color-black;
    }
    &:disabled {
      background: $color-grey-ultra-dark;
      cursor: not-allowed;
    }
  }
</style>
