import { ref } from "vue";
import { defineStore } from "pinia";
import { getUser, register, login, saveUser } from "../apis/auth.js";
import { changeUser } from "../apis/user.js";

export const useUserStore = defineStore("user", () => {
  const user = ref(getUser() || {});
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

  const changeShowPostModal = (bool) => {
    showPostModal.value = bool;
  };

  const changeShowPostDetail = (bool) => {
    showPostDetail.value = bool;
  };

  const uploadUser = (user) => {
    // const uploadedUser = await changeUser(user)
    // user.value = uploadedUser

    const updateUser = {
      avatar: user.avatar,
      blocked: false,
      confirmed: true,
      createdAt: new Date(),
      email: "",
      gender: user.gender,
      id: Math.random(),
      intro: user.intro,
      mobilePhone: user.mobilePhone,
      name: user.name,
      provider: "local",
      updatedAt: new Date(),
      username: user.username,
      website: user.website,
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
    changeShowPostModal,
    changeShowPostDetail,
    uploadUser,
  };
});
