<template>
  <AlertBase class="alert-outdated" iconName="error">
    <template v-slot:text>
      Курсы валют в данный момент неактуальны.
      <span class="alert-outdated__regular"> Мы уже работаем над исправлением. </span>
    </template>
    <template v-slot:controls>
      <UiButton size="sm" type="secondary">Написать</UiButton>
      <!-- What we expect on refresh click? -->
      <UiButton size="sm" @click="reloadNuxtApp">Обновить</UiButton>
    </template>
  </AlertBase>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .alert-outdated {
    &__regular {
      font-weight: 400;
    }
  }
</style>
