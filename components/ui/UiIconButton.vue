<template>
  <button class="ui-icon-button">
    <UiIcon :name="iconName" />
  </button>
</template>
<script lang="ts" setup>
  defineProps({
    iconName: {
      type: String,
      reuired: true
    }
  })
</script>
<style lang="scss" scoped>
  .ui-icon-button {
    background: $color-surface-gray;
    border-radius: $radius-md;
    padding: $padding-sm;
    border: 0;
    &:hover {
      background: $color-surface-secondary-hover;
    }
    &:disabled {
      cursor: not-allowed;
    }
    :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }
</style>
