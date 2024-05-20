<template>
  <div class="ui-loading" />
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .ui-loading {
    width: 100%;
    height: 30px;
    border-radius: $radius-full;
    background: linear-gradient(90deg, #efefef, #e1e1e1, #efefef);
    animation: animate 2s linear infinite;
    background-size: 200% 200%;
  }

  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -200%;
    }
  }
</style>
