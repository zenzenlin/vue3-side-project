<template>
  <div>
    <div class="profileContainer">
      <TheAvatar
        :width="186"
        :height="186"
        :src="`http://localhost:1337${user?.avatar}`"
      />
      <div class="profile">
        <p class="name">
          <span>{{ user?.name }}</span
          ><router-link to="/profile_edit">編輯個人資料</router-link>
        </p>
        <p class="handle">@{{ user?.username }}</p>
        <div class="description">
          <pre>{{ user?.intro }}</pre>
        </div>
        <p class="website">{{ user?.website }}</p>
      </div>
    </div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab', { active: index === currentTab }]"
        @click="currentTab = index"
      >
        <TheIcon :icon="tab.icon" />
        <p>{{ tab.lebal }}</p>
      </div>
    </div>
    <div class="tabContent">
      <p>{{ myPosts[currentTab]?.length || 0 }} 篇貼文</p>
      <div v-if="myPosts[currentTab]?.length" class="posts">
        <img
          v-for="(post, index) in myPosts[currentTab]"
          :key="index"
          :src="post?.image"
          class="postImage"
        />
      </div>
    </div>
    <PostUpload v-if="showPostModal" />
  </div>
</template>

<script setup>
import TheIcon from "../components/TheIcon.vue";
import TheAvatar from "../components/TheAvatar.vue";
import PostUpload from "../components/PostUpload.vue";
import { useUserStore } from "../stores/user.js";
import { usePostStore } from "../stores/post.js";
import { watch, computed, ref, reactive, onMounted } from "vue";

const userStore = useUserStore();
const postStore = usePostStore();

const user = computed(() => userStore.user);
const myPosts = computed(() => postStore.myPosts);
const showPostModal = computed(() => userStore.showPostModal);
const tabs = [
  { label: "我的", icon: "posts" },
  { label: "讚過", icon: "like" },
  { label: "收藏", icon: "favorite" },
];
const currentTab = ref(0);

// 監聽 currentTab，載入分頁相關貼文
watch(
  currentTab,
  async () => {
    if (!myPosts.value[currentTab.value].length) {
      await postStore.loadMyPosts(currentTab.value);
    }
  },
  { immediate: true }
);

onMounted(() => {
  userStore.getUserInfo();
});
</script>

<style lang="scss" scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
  .avatar {
    justify-self: end;
  }

  .profile {
    .name {
      display: flex;
      align-items: center;
      > span {
        font-size: 26px;
      }
      > a {
        color: #1da0ff;
        text-decoration: none;
        margin-left: 26px;
      }
    }
    .handle {
      margin-top: 4px;
      color: #848484;
    }
    .description {
      margin-top: 26px;
      margin-bottom: 22px;
    }
  }
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;
  margin-top: 7vmin;
  margin-bottom: 20px;
  .tab {
    text-align: center;
    padding: 12px 0;
    cursor: pointer;
    > svg {
      width: 32px;
      height: 32px;
      stroke: #8a9194;
      fill: #8a9194;
    }
    &.active {
      background: #f6f9fb;
      border-radius: 18px;
      > svg {
        stroke: #1787d9;
        fill: #1787d9;
      }
      > p {
        color: #1787d9;
      }
    }
  }
}

.tabContent {
  > p {
    text-align: center;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    .postImage {
      width: 100%;
      height: 321px;
      background: #eee;
      object-fit: cover;
    }
  }
}
</style>
