import { ref } from "vue";
import { defineStore } from "pinia";
import { getUser, register, login, saveUser, logout } from "../apis/auth.js";
import { changeUser } from "../apis/user.js";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const showPostModal = ref(false);
  const showPostDetail = ref(false);

  const registerUser = ({ email, username, password }) => {
    const user = register(email, username, password);
    user.value = user;
  };

  const loginUser = ({ email, password }) => {
    const user = login(email, password);
    user.value = user;
  };

  const logoutUser = () => {
    logout();
    user.value = {};
  };

  const changeShowPostModal = (bool) => {
    showPostModal.value = bool;
  };

  const changeShowPostDetail = (bool) => {
    showPostDetail.value = bool;
  };

  const uploadUser = (uploadedData) => {
    // const uploadedUser = await changeUser(user)
    // user.value = uploadedUser

    const updateUser = {
      avatar: uploadedData.avatar,
      blocked: false,
      confirmed: true,
      createdAt: new Date(),
      email: "",
      gender: uploadedData.gender,
      id: Math.random(),
      intro: uploadedData.intro,
      mobilePhone: uploadedData.mobilePhone,
      name: uploadedData.name,
      provider: "local",
      updatedAt: new Date(),
      username: uploadedData.username,
      website: uploadedData.website,
    };
    user.value = updateUser;
    saveUser(updateUser);
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
  };
});
