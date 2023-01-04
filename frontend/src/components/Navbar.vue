<template>
  <nav class="navbar">
    <router-link to="/">
      <img src="../assets/logo.svg" alt="" />
    </router-link>
    <div class="searchInput">
      <input type="text" @change="searchPosts" />
      <TheIcon icon="search" />
    </div>
    <div class="navItems">
      <router-link to="/">
        <TheIcon icon="home" />
      </router-link>
      <button @click="publishPost()">
        <TheIcon icon="publish" />
      </button>
      <!-- dropdown -->
      <div class="profileDropdown">
        <TheAvatar
          :width="42"
          :height="42"
          :src="user.avatar"
          style="cursor: pointer"
          @click="profileMenuShow = !profileMenuShow"
        />
        <div v-show="profileMenuShow" class="dropdownMenu">
          <ul class="profileMenu">
            <router-link
              tag="li"
              to="/profile"
              @click="profileMenuShow = false"
            >
              個人主頁
            </router-link>
            <li @click="logout">退出</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TheIcon from "./TheIcon.vue";
import TheAvatar from "../components/TheAvatar.vue";
import { useUserStore } from "../stores/user.js";
import { usePostStore } from "../stores/post.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const userStore = useUserStore();
const postStore = usePostStore();
const user = computed(() => userStore.user);

const profileMenuShow = ref(false);

async function searchPosts(e) {
  await postStore.searchPosts(e.target.value);
  router.push({
    name: "SearchResult",
    params: {
      term: e.target.value,
    },
  });
}

function publishPost() {
  userStore.changeShowPostModal(true);
}

async function logout() {
  profileMenuShow.value = false;
  await userStore.logoutUser();
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  svg {
    width: 38px;
    height: 38px;
  }

  .searchInput {
    position: relative;
    input {
      width: 100%;
      padding: 12px 36px 12px;
      background: #f1f1f1;
      border-radius: 14px;
      border: none;
    }
    svg {
      position: absolute;
      left: 0;
      top: 11px;
      left: 12px;
    }
  }

  .navItems {
    justify-self: end;
    display: flex;
    gap: 24px;
    align-items: center;
    button {
      border: none;
      background: none;
    }
  }

  .profileDropdown {
    position: relative;
  }

  .profileMenu {
    position: absolute;
    width: max-content;
    padding: 24px 26px;
    list-style: none;
    background: #fff;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    right: 0;
    display: grid;
    row-gap: 18px;
    transform: translateY(18px);
    ::before {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      top: -12px;
      right: 10px;
      border-bottom: 12px solid #fff;
      border-left: 12px transparent;
      border-right: 12px transparent;
    }
    a,
    li {
      text-decoration: none;
      cursor: pointer;
    }
    a:visited {
      color: #0c9;
    }
  }
}
</style>
