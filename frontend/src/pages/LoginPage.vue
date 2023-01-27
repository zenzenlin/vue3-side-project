<template>
  <div class="loginPage">
    <img src="../assets/phone.png" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" />
      <form>
        <input type="email" placeholder="信箱" v-model="email" />
        <input
          v-if="!isLogin"
          type="text"
          placeholder="用戶名"
          v-model="username"
        />
        <input type="password" placeholder="密碼" v-model="password" />
        <button
          type="button"
          class="loginButton"
          @click="isLogin ? login() : submitAction()"
        >
          {{ isLogin ? "登錄" : "註冊" }}
        </button>
        <p class="info" @click="isLogin = !isLogin">
          {{ isLogin ? "還沒有帳號？點擊註冊" : "已有帳號？點擊登錄" }}
        </p>
      </form>
      <div v-if="!isLogin" class="agreetment">
        <input
          type="checkbox"
          v-model="agreetmentChecked"
        />勾選表示同意隱私協議及使用規範
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";
const router = useRouter();
const userStore = useUserStore();

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const username = ref("");
const agreetmentChecked = ref(false);
/**
 * 註冊
 */
async function submitAction() {
  if (!agreetmentChecked.value) {
    alert("請勾選協議");
    return;
  }

  await userStore.registerUser({
    email: email.value,
    username: username.value,
    password: password.value,
  });
  // 使用 replace 避免頁面可以後退到登入頁
  router.replace("/");
}

/**
 * 登入
 */
async function login() {
  await userStore.loginUser({
    email: email.value,
    password: password.value,
  });
  // 使用 replace 避免頁面可以後退到登入頁
  router.replace("/");
}
</script>

<style lang="scss" scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;
  padding: 0 10vw;

  .phoneImage {
    max-width: 400px;
    position: relative;
    top: 36px;
    justify-self: end;
  }

  .loginForm {
    justify-self: start;
    box-shadow: 0, 4px, 48px, rgba(0, 0, 0, 0.06);
    border-radius: 32px;
    background: #fff;
    padding: 74px 60px;
    display: grid;
    place-items: center;
    row-gap: 52px;
    width: 300px;
    > form {
      display: grid;
      row-gap: 24px;
      width: 100%;
      height: 100%;
      input {
        background: #fafafa;
        border-radius: 4px;
        border: none;
        ::placeholder {
          color: #9e9e9e;
        }
      }
    }

    .loginButton {
      background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 106.68%);
      padding: 12px 0;
      color: #fff;
      border: none;
    }

    .info {
      color: #1da0ff;
      text-align: center;
      cursor: pointer;
    }
  }
}

.agreetment {
  color: #a1a1a1;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
