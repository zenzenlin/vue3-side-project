<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop"></div>
      <div class="modalContent">
        <button class="closeBtn" @click="$emit('close')">
          <TheIcon icon="close" />
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import TheIcon from "./TheIcon.vue";

// 基礎組建不與狀態綁定，傳遞事件出去
defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  .backdrop {
    background: rgba(0, 0, 0, 0.56);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .modalContent {
    position: relative;
    background: #fff;
    border-radius: 52px;
    overflow: hidden;
  }
}

.closeBtn {
  position: absolute;
  background: none;
  border: none;
  right: 14px;
  top: 10px;
  svg {
    width: 54px;
    height: 54px;
  }
}
</style>
