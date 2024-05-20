<template>
  <component :is="is" :class="computedClasses">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import type { TypographyIs, TypographyLevel, TypographyWeight } from '@/types/ui'

  const props = defineProps({
    is: { type: String as PropType<TypographyIs>, default: 'div' },
    level: { type: String as PropType<TypographyLevel>, default: 'p1' },
    weight: { type: String as PropType<TypographyWeight>, default: '400' }
  })

  const { level, weight } = toRefs(props)

  const sizeClasses: { [K in TypographyLevel]: string } = {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    h4: 'heading-4',
    b1: 'base-1',
    b2: 'base-2',
    b3: 'base-3'
  }

  const weights: { [K in TypographyWeight]: string } = {
    '400': 'regular',
    '500': 'medium',
    '600': 'semibold'
  }

  const computedClasses = computed(() => {
    return [sizeClasses[level.value], weights[weight.value]]
  })
</script>

<style lang="scss" scoped>
  .base-1 {
    @include text-base-1;
  }
  .base-2 {
    @include text-base-2;
  }
  .base-3 {
    @include text-base-3;
  }
  .heading-4 {
    @include text-heading-4;
  }
  .regular {
    font-weight: 400;
  }
  .medium {
    font-weight: 500;
  }
  .semibold {
    font-weight: 600;
  }
</style>
