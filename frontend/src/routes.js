import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ProfileEditPage from "./pages/ProfileEditPage.vue";
import SearchPage from "./pages/SearchPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/search_result",
    name: "SearchResult",
    component: SearchPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/profile_edit",
    name: "ProfileEdit",
    component: ProfileEditPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  // 未登入跳轉登入頁
  if (to.name !== "Login" && !getJwtToken()) {
    return { name: "Login" };
  }
  // 已登入跳轉首頁
  if (to.name === "Login" && getJwtToken()) {
    return { name: "Home" };
  }
});
export { router };
