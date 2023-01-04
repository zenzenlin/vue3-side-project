<template>
  <div>
    <h2 class="title">搜尋結果：{{ term }}</h2>
    <PostList>
      <PostItem
        v-for="(post, index) in searchResult"
        :data="post"
        :key="index"
      />
    </PostList>
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { usePostStore } from "../stores/post.js";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const postStore = usePostStore();

const searchResult = computed(() => postStore.searchResult);
const term = computed(() => route.params.term);
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>