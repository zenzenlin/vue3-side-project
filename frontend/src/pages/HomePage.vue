<template>
  <div>
    <PostList>
      <PostItem v-for="(list, index) in listData" :data="list" :key="index" />
    </PostList>
    <PostDetails v-if="showPostDetail" />
    <PostUpload v-if="showPostModal" />
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostDetails from "../components/PostDetails.vue";
import PostUpload from "../components/PostUpload.vue";
import { useUserStore } from "../stores/user.js";
import { usePostStore } from "../stores/post.js";
import { computed } from "vue";

const userStore = useUserStore();
const postStore = usePostStore();
const showPostModal = computed(() => userStore.showPostModal);
const showPostDetail = computed(() => userStore.showPostDetail);
const listData = computed(() => postStore.listData);
</script>
