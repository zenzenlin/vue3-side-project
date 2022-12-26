import { defineStore } from "pinia";
import { createComment, loadComment } from "../apis/comments";
import { usePostStore } from "./post";
import { ref } from "vue";

export const useCommentStore = defineStore("comment", () => {
  const postStore = usePostStore();
  const commentList = ref([]);

  const addComment = async ({ content, postId }) => {
    // await createComment(content, postId);
    loadComments(content);
    postStore.increaseCommentCount(postId);
  };

  const loadComments = async (content) => {
    // const loadComments = async (postId) => {
    // const comments = await loadComment(postId)

    // initializeComment(comments);
    initializeComment(content);
  };

  const initializeComment = (comments) => {
    console.log(comments);
    commentList.value.push({ content: comments });
  };

  return {
    commentList,
    addComment,
    loadComments,
    initializeComment,
  };
});
