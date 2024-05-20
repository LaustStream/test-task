<template>
  <AlertOutdated v-if="activeAlert === AlertName.OUTDATED" />
</template>
<script lang="ts" setup>
  import { AlertName } from '@/types/alert'

  const store = useAlertStore()

  const activeAlert = computed(() => store.activeAlert)
</script>
