import { defineStore } from "pinia";
import { createPost, loadPost, likePost, favoritePost } from "../apis/post";
import { useUserStore } from "./user";
import { ref, reactive } from "vue";

export const usePostStore = defineStore("post", () => {
  const userStore = useUserStore();
  const uploadedData = ref(null);
  const listData = ref([]);
  const myPosts = reactive({
    0: listData,
    1: [],
    2: [],
  });
  const isLike = ref(false);
  const isFavorite = ref(false);
  const searchResult = ref(null);

  const uploadPost = async ({ image, description }) => {
    // await createPost(image, description);
    // uploadedData.value = {
    //   image: URL.createObjectURL(image),
    //   description,
    // };
    loadPost({ image: image, description: description });
    userStore.changeShowPostModal(false);
  };

  const loadPost = async ({ image, description }) => {
    // await loadPost();
    listData.value.push({
      id: Math.random(),
      image: URL.createObjectURL(image),
      description,
      comments: 0,
      isLikedByMe: false,
      isFavoredByMe: false,
    });
  };

  const likePost = async (likedPostId) => {
    // await likePost(id);
    isLike.value = !isLike.value;
    const likePost = listData.value.find(({ id }) => id === likedPostId);
    if (myPosts[1].find(({ id }) => id !== likedPostId)) {
      likePost.isLikedByMe = !likePost.isLikedByMe;
      myPosts[1].push(likePost);
    } else {
      likePost.isLikedByMe = !likePost.isLikedByMe;
      myPosts[1].splice(
        myPosts[1].findIndex(({ id }) => id === likedPostId),
        1
      );
    }
  };

  const favoritePost = async (favoriteId) => {
    // await favoritePost(id);
    isFavorite.value = !isFavorite.value;
    const favoritePost = listData.value.find(({ id }) => id === favoriteId);
    favoritePost.isFavoredByMe = !favoritePost.isFavoredByMe;
    myPosts[2].push(favoritePost);
  };

  const showDetail = () => {
    userStore.changeShowPostDetail(true);
  };

  const hideDetail = () => {
    userStore.changeShowPostDetail(false);
  };

  const increaseCommentCount = (postId) => {
    // const post = listData.find(({ id }) => id === postId);
    listData.value[0].comments += 1;
  };

  const searchPosts = async (keyWord) => {
    // const posts = await loadPosts("filters[description][$contains]=" + keyWord);
    searchResult.value = [
      {
        id: Math.random(),
        // image: URL.createObjectURL(image),
        // description,
        comments: 0,
        isLikedByMe: false,
        isFavoredByMe: false,
      },
    ];
  };

  return {
    uploadedData,
    listData,
    myPosts,
    searchResult,
    isLike,
    isFavorite,
    uploadPost,
    loadPost,
    likePost,
    favoritePost,
    showDetail,
    hideDetail,
    increaseCommentCount,
    searchPosts,
  };
});
