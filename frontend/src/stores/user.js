import { ref } from "vue";
import { defineStore } from "pinia";
import { getUser, register, login, logout } from "../apis/auth.js";
import { changeUser } from "../apis/user.js";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const showPostModal = ref(false);
  const showPostDetail = ref(false);

  const registerUser = ({ email, username, password }) => {
    const userInfo = register(email, username, password);
    user.value = userInfo;
  };

  const loginUser = ({ email, password }) => {
    const userInfo = login(email, password);
    user.value = userInfo;
  };

  const logoutUser = () => {
    logout();
    user.value = {};
  };

  const getUserInfo = () => {
    const userInfo = getUser();
    user.value = userInfo;
  };

  const changeShowPostModal = (bool) => {
    showPostModal.value = bool;
  };

  const changeShowPostDetail = (bool) => {
    showPostDetail.value = bool;
  };

  const uploadUser = async (profileData) => {
    const userInfo = await changeUser(profileData);
    user.value = userInfo;
  };

  return {
    user,
    showPostModal,
    showPostDetail,
    registerUser,
    loginUser,
    logoutUser,
    changeShowPostModal,
    changeShowPostDetail,
    uploadUser,
    getUserInfo,
  };
});
