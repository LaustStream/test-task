<template>
  <NuxtLink v-if="link" :to="link">
    <slot />
  </NuxtLink>

  <button v-else>
    <slot />
  </button>
</template>
<script lang="ts" setup>
defineProps({
  link: {
    type: String,
    default: undefined
  }
})
</script>
<style lang="scss" scoped></style>
