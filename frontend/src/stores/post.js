import { defineStore } from "pinia";
import {
  createPost,
  loadPosts,
  loadPostByMe,
  loadLikeOrFavoriteByMe,
  likePost,
  favoritePost,
} from "../apis/post";
import { useUserStore } from "./user";
import { useCommentStore } from "./comment";
import { ref } from "vue";

export const usePostStore = defineStore("post", () => {
  const userStore = useUserStore();
  const commentStore = useCommentStore();

  const listData = ref([]);
  const myPosts = ref({ 0: [], 1: [], 2: [] });
  const postDetailId = ref("");
  const searchResult = ref(null);

  const uploadPost = async ({ image, description }) => {
    await createPost(image, description);
    userStore.changeShowPostModal(false);
    loadAllPost();
  };

  const loadAllPost = async () => {
    listData.value = await loadPosts();
  };

  const loadMyPosts = async (currentTab) => {
    switch (currentTab) {
      case 0:
        myPosts.value[currentTab] = await loadPostByMe();
        break;
      case 1:
        myPosts.value[currentTab] = await loadLikeOrFavoriteByMe();
        break;
      case 2:
        myPosts.value[currentTab] = await loadLikeOrFavoriteByMe("favors");
        break;
    }
  };

  const toggleLike = async (likeId) => {
    const isLike = await likePost(likeId);
    const post = listData.value.find(({ id }) => id === likeId);

    if (isLike) {
      post.liked_bies = (post.liked_bies || 0) + 1;
    } else {
      post.liked_bies--;
    }
    post.likedByMe = isLike;
  };

  const toggleFavorite = async (favoriteId) => {
    const isFavorite = await favoritePost(favoriteId);
    const post = listData.value.find(({ id }) => id === favoriteId);

    if (isFavorite) {
      post.favored_bies = (post.favored_bies || 0) + 1;
    } else {
      post.favored_bies--;
    }
    post.favoredByMe = isFavorite;
  };

  const showDetail = (id) => {
    postDetailId.value = id;
    commentStore.loadAllComments(id);
    userStore.changeShowPostDetail(true);
  };

  const hideDetail = () => {
    userStore.changeShowPostDetail(false);
  };

  const increaseCommentCount = (postId) => {
    const post = listData.value.find(({ id }) => id === postId);
    post.comments += 1;
  };

  const searchPosts = async (keyWord) => {
    searchResult.value = await loadPosts(
      "filters[description][$contains]=" + keyWord
    );
  };

  return {
    listData,
    myPosts,
    postDetailId,
    searchResult,
    uploadPost,
    loadAllPost,
    loadMyPosts,
    toggleLike,
    toggleFavorite,
    showDetail,
    hideDetail,
    increaseCommentCount,
    searchPosts,
  };
});
