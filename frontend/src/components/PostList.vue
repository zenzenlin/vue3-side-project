<template>
  <div class="postList">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.postList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}
</style>
