<template>
  <div class="postActions">
    <TheIcon
      icon="like"
      :fill="isLikedByMe ? '#FF3C3C' : 'none'"
      :stroke="isLikedByMe ? '#FF3C3C' : '#000'"
      @click="$emit('likeClick')"
    /><span>{{ likes }}</span>
    <TheIcon
      icon="comment"
      fill="none"
      stroke="#000"
      @click="$emit('commentsClick')"
    /><span>{{ comments }}</span>
    <TheIcon
      icon="favorite"
      :fill="isFavoredByMe ? '#FFD12E' : 'none'"
      :stroke="isFavoredByMe ? '#FFD12E' : '#000'"
      @click="$emit('favorClick')"
    /><span>{{ favors }}</span>
  </div>
</template>

<script setup>
import TheIcon from "./TheIcon.vue";

defineProps({
  likes: Number,
  comments: Number,
  favors: Number,
  isLikedByMe: Boolean,
  isFavoredByMe: Boolean,
});

defineEmits(["likeClick", "commentsClick", "favorClick"]);
</script>

<style lang="scss" scoped>
.postActions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  justify-self: end;
  column-gap: 16px;
  row-gap: 4px;
  svg {
    width: 32px;
    height: 32px;
    grid-row: 1 / 2;
  }
  span {
    font-size: 14px;
  }
}

.postDesc {
  margin-top: 28px;
  white-space: pre-line;
}
</style>
