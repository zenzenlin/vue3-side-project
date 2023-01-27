<template>
  <div>
    <PostList>
      <PostItem
        v-for="postItem in postData"
        :data="postItem"
        :key="postItem.id"
      />
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
import { computed, onMounted } from "vue";

const userStore = useUserStore();
const postStore = usePostStore();

const showPostModal = computed(() => userStore.showPostModal);
const showPostDetail = computed(() => userStore.showPostDetail);
const postData = computed(() => postStore.listData);

onMounted(() => {
  postStore.loadAllPost();
});
</script>
