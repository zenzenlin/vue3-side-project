import { defineStore } from "pinia";
import { createComment, loadComment } from "../apis/comments";
import { usePostStore } from "./post";
import { ref } from "vue";

export const useCommentStore = defineStore("comment", () => {
  const postStore = usePostStore();
  const commentList = ref([]);

  const addComment = async ({ content, postId }) => {
    await createComment(content, postId);
    loadAllComments(postId);
    postStore.increaseCommentCount(postId);
  };

  const loadAllComments = async (postId) => {
    const comments = await loadComment(postId);
    initializeComment(comments);
  };

  const initializeComment = (comments) => {
    commentList.value = comments;
  };

  return {
    commentList,
    addComment,
    loadAllComments,
  };
});
