<template>
  <div class="ui-dropdown-item">
    <UiDropdownContent size="sm" :content="content" />
    <UiIcon v-if="active" class="ui-dropdown-item__icon" name="success" />
  </div>
</template>
<script lang="ts" setup>
import { type DropdownItem } from './UiDropdown.vue'

defineProps({
  content: {
    type: Object as PropType<DropdownItem>,
    required: true
  },
  active: {
    type: Boolean
  }
})
</script>
<style lang="scss" scoped>
.ui-dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $padding-sm $padding-xl;
  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
