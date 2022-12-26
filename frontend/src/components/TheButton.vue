<template>
  <button :class="['button', { primary: color === 'primary', reverse }]">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  reverse: Boolean,
});
</script>

<style lang="scss" scoped>
.button {
  border-radius: 8px;
  padding: 10px 32px;
  border: none;
  color: #fff;
  font-size: 16px;
  &.primary {
    background: #1da0ff;
  }
  &.reverse {
    background: none;
    border: 1px solid #e8e8e8;
    color: initial;
  }
}
</style>
