<template>
  <div class="other-swap-total">
    <div v-if="!loading" class="other-swap-total__row">
      <UiTypography :level="typographyLevel" weight="600">{{ from }}</UiTypography>
      <UiTypography :level="typographyLevel" weight="600">{{ seperater }}</UiTypography>
      <UiTypography :level="typographyLevel" weight="600">{{ to }}</UiTypography>
    </div>
    <UiLoading v-else class="other-swap-total__loader" />
  </div>
</template>
<script lang="ts" setup>
  type Size = 'lg' | 'sm'

  const props = defineProps({
    size: {
      type: String as PropType<Size>,
      default: 'lg'
    },
    from: {
      type: String,
      reuired: true
    },
    to: {
      type: String,
      reuired: true
    },
    seperater: {
      type: String,
      reuired: true
    },
    loading: {
      type: Boolean
    }
  })

  const typographyLevel = computed(() => (props.size === 'lg' ? 'b2' : 'b3'))
</script>
<style lang="scss" scoped>
  .other-swap-total {
    &__row {
      display: flex;
      align-items: center;
      gap: $gap-2xs;
    }
    &__loader {
      width: 180px;
      height: 20px;
    }
  }
</style>
