<template>
  <svg>
    <use :href="`${sprite}#icon-${icon}`"></use>
  </svg>
</template>

<script setup>
// 使用動態屬性，不能直接寫圖片路徑，要 import 導入
import sprite from "../assets/icons/sprite.svg"

defineProps({
  icon: String,
})
</script>