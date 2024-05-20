<template>
  <div class="ui-dropdown" :class="{ active: isOpen, loading }" v-click-outside="closeDropdown">
    <div class="ui-dropdown__body" @click="toggleDropdown">
      <UiDropdownContent :content="valueProxy" :loading="loading" />
      <UiIcon class="ui-dropdown__arrow-down" name="arrow-down" />
    </div>
    <div v-if="isOpen" class="ui-dropdown__list">
      <UiDropdownItem :content="valueProxy" :active="true" />
      <UiDropdownItem v-for="(item, idx) in list" :content="item" @click="handleItemClick(item)" :key="idx" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import isEqual from 'lodash/isEqual'

  export interface DropdownItem {
    value: any
    name: string
    label?: string
    subText?: string
    icon?: string
  }

  const isOpen = ref(false)

  const props = defineProps({
    modelValue: {
      type: Object as PropType<DropdownItem>,
      required: true
    },
    items: {
      type: Array as PropType<DropdownItem[]>,
      default: []
    },
    loading: {
      type: Boolean
    }
  })

  const handleItemClick = (item: DropdownItem) => {
    valueProxy.value = item
  }

  const list = computed(() => props.items.filter((item) => !isEqual(item.value, props.modelValue.value)))

  const emits = defineEmits(['update:modelValue', 'change'])

  const toggleDropdown = () => {
    if (props.loading) return

    isOpen.value = !isOpen.value
  }
  const closeDropdown = () => (isOpen.value = false)

  const valueProxy = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emits('update:modelValue', val)
      emits('change', val)
      closeDropdown()
    }
  })
</script>
<style lang="scss" scoped>
  .ui-dropdown {
    position: relative;
    background: $color-surface-gray;
    cursor: pointer;
    &:hover:not(.loading) {
      background: $color-surface-secondary-hover;
    }
    &.active {
      background: $color-surface-secondary-hover;
      .ui-dropdown__arrow-down {
        transform: scale(1, -1);
      }
      .ui-dropdown__body:before {
        display: block;
      }
    }
    &__body {
      position: relative;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $padding-xl;
      border-radius: inherit;
      overflow: hidden;
      &:before {
        @include ui-active-before;
      }
    }
    &__list {
      position: absolute;
      z-index: 2;
      top: calc(100% + $size-2);
      right: 0;
      background: $color-surface-main;
      border: 1px solid $color-border-light;
      border-radius: $radius-md;
      box-shadow: 0px 4px 24px 0px #20202014;
      width: 485px;
      max-height: 143px;
      overflow-y: auto;
      padding: $padding-xs 0;
    }
  }
</style>
