<template>
  <div class="ui-icon" v-html="icon" />
</template>
<script lang="ts" setup>
const icon = ref()

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const icons = Object.fromEntries(
  Object.entries(import.meta.glob('assets/icons/*.svg', { as: 'raw' })).map(([key, value]) => {
    const filename = key.split('/').pop()!.split('.').shift()
    return [filename, value]
  })
)

export type IconsKeys = keyof typeof icons

const loadIcon = async () => {
  try {
    const iconRaw = await icons[props.name]()
    icon.value = iconRaw
  } catch {
    throw showError({ statusMessage: `Icon ${props.name} not found`, statusCode: 404 })
  }
}

await loadIcon()

watch(
  () => props.name,
  () => loadIcon()
)
</script>
<style lang="scss">
.ui-icon {
  display: flex;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
