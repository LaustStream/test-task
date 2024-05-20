<template>
  <div class="ui-dropdown-content" :class="size">
    <div class="ui-dropdown-content__row">
      <template v-if="!loading">
        <img v-if="content.icon" class="ui-dropdown-content__icon" :src="content.icon" :alt="`${content.name}`" />
        <div>
          <UiTypography v-if="content.label" class="ui-dropdown-content__label" level="b3" weight="500">
            {{ content.label }}
          </UiTypography>
          <div class="ui-dropdown-content__row">
            <UiTypography class="ui-dropdown-content__value" :level="nameTypographyLevel" weight="500">
              {{ content.name }}
            </UiTypography>
            <UiTypography v-if="content.subText" class="ui-dropdown-content__sub-text" level="b3" weight="500">
              {{ content.subText }}
            </UiTypography>
          </div>
        </div>
      </template>
      <template v-else>
        <UiLoading class="ui-dropdown-content__icon-loader" />
        <div>
          <UiLoading class="ui-dropdown-content__label-loader" />
          <UiLoading class="ui-dropdown-content__value-loader" />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue'
  import { type DropdownItem } from './UiDropdown.vue'

  type Size = 'lg' | 'sm'

  const props = defineProps({
    size: {
      type: String as PropType<Size>,
      default: 'lg'
    },
    content: {
      type: Object as PropType<DropdownItem>,
      required: true
    },
    loading: {
      type: Boolean
    }
  })

  const nameTypographyLevel = computed(() => (props.size === 'lg' ? 'h4' : 'b1'))
</script>
<style lang="scss" scoped>
  .ui-dropdown-content {
    &__row {
      display: flex;
      align-items: center;
      gap: 0 8px;
    }
    &__icon {
      width: 36px;
      height: 36px;
      border-radius: $radius-full;
      flex-shrink: 0;
    }

    &__label {
      margin-bottom: 4px;
    }
    &__value {
      color: $color-text-primary;
    }
    &__sub-text {
      background: $color-surface-secondary-addon;
      border-radius: $radius-xl;
      padding: $size-05 $size-2;
    }
    &__icon-loader {
      width: 36px;
      height: 36px;
    }
    &__label-loader,
    &__value-loader {
      width: 85px;
    }
    &__label-loader {
      height: 16px;
      margin-bottom: $margin-2xs;
    }
    &__value-loader {
      height: 28px;
    }
  }
</style>
