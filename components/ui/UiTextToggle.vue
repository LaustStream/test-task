<template>
  <div class="ui-text-toggle" :class="{ active: valueProxy, disabled }" @click="handleClick">
    <UiTypography class="ui-text-toggle__text" level="b3" weight="600"><slot /></UiTypography>
    <UiIcon class="ui-text-toggle__icon" name="arrow-down" />
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean
    }
  })

  const emits = defineEmits(['update:modelValue'])

  const valueProxy = computed({
    get() {
      return props.modelValue && !props.disabled
    },
    set(val) {
      emits('update:modelValue', val)
    }
  })

  const handleClick = () => {
    if (props.disabled) return
    valueProxy.value = !valueProxy.value
  }
</script>
<style lang="scss" scoped>
  .ui-text-toggle {
    display: flex;
    align-items: center;
    gap: 0 $gap-3xs;
    cursor: pointer;
    &.active {
      .ui-text-toggle__icon {
        transform: scale(1, -1);
      }
    }
    &.disabled {
      cursor: not-allowed;
    }
    &__text {
      color: $color-text-info;
    }
    &__icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      :deep(svg path) {
        stroke: $color-text-info;
      }
    }
  }
</style>
