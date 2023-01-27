<template>
  <TheModal @close="postStore.hideDetail()">
    <div class="postDetails">
      <img class="postImage" :src="listData?.image" />
      <div class="postMeta">
        <div class="author">
          <TheAvatar :src="listData?.user?.image" />
          <span>{{ listData?.user?.name }}</span>
        </div>
        <pre class="postDesc">
          {{ listData?.description }}
        </pre>
        <div class="comments">
          <div class="comment" v-for="item in comments">
            <TheAvatar :src="formatAvatar(item?.user?.avatar)" />
            <span class="user">{{ item?.user?.name }}</span>
            <span class="commentDate">
              {{ dateToRelative(item?.pubDate) }}
            </span>
            <p class="commentContent">{{ item?.content }}</p>
          </div>
        </div>
        <div class="actions">
          <PostActions
            :likes="listData?.liked_bies"
            :comments="listData?.comments"
            :favors="listData?.favored_bies"
            :isLikedByMe="listData?.likedByMe"
            :isFavoredByMe="listData?.favoredByMe"
            @likeClick="postStore.toggleLike(listData.id)"
            @favorClick="postStore.toggleFavorite(listData.id)"
          />
          <span class="postPubDate">
            {{ dateToRelative(listData?.publishedAt) }}
          </span>
          <input
            type="text"
            name="comment"
            v-model="content"
            id=""
            class="commentInput"
            placeholder="寫個評論吧"
          />
          <button
            class="commentPubBtn"
            @click="addComment(content, listData.id)"
          >
            發布
          </button>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheIcon from "./TheIcon.vue";
import TheAvatar from "./TheAvatar.vue";
import PostActions from "./PostActions.vue";
import TheModal from "./TheModal.vue";
import { dateToRelative } from "../utils/date.js";
import { usePostStore } from "../stores/post.js";
import { useCommentStore } from "../stores/comment.js";
import { ref, computed } from "vue";

const postStore = usePostStore();
const commentStore = useCommentStore();

const listData = computed(() =>
  postStore.listData.find(({ id }) => id === postStore.postDetailId)
);
const comments = computed(() => commentStore.commentList);
const content = ref("");
/**
 * 發布評論
 */
function addComment(content, postId) {
  commentStore.addComment({ content, postId: postId });
}
/**
 * 轉換頭像路徑
 */
function formatAvatar(avatar) {
  if (avatar === null) {
    return;
  }
  return `http://localhost:1337${avatar.split("?")[0]}`;
}
</script>

<style lang="scss" scoped>
.postDetails {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-template-rows: minmax(0, 1fr);
  width: 80vw;
  height: 80vh;
  .postImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .postMeta {
    padding: 24px;
    padding-top: 36px;
    display: grid;
    align-items: start;
    grid-template-rows: max-content max-content 1fr max-content;
    max-height: 100%;
    height: 100%;
  }
  .author {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .postDesc {
    width: 100%;
    white-space: pre-wrap;
    margin-top: 24px;
  }
  .comments {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-gap: 28px;
    align-items: start;
    overflow-y: auto;
    height: 100%;
    .comment {
      display: grid;
      grid-template-areas:
        "avatar name date"
        "comment comment comment";
      grid-template-columns: 34px 1fr 1fr;
      align-items: center;
      column-gap: 16px;
      row-gap: 4px;
      .commentDate {
        grid-area: date;
        justify-self: end;
        color: #a7a7a7;
      }
      .commentContent {
        grid-area: comment;
      }
    }
  }
  .actions {
    border-top: 1px solid #eaeaea;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    margin: 20px -24px 0px -24px;
    padding: 20px 24px 0 24px;
    row-gap: 16px;
    .postActions > :deep(svg) {
      transform: scale(0.8125);
    }

    .postPubDate {
      color: #9f9f9f;
      grid-column: 2 / 6;
      justify-self: end;
      font-size: 14px;
    }
    .commentInput {
      background: #f7f7f7;
      border-radius: 16px;
      border: none;
      grid-column: 1 / 4;
      ::placeholder {
        color: #b9b9b9;
        border: none;
      }
    }
    .commentPubBtn {
      color: #1da0ff;
      border: none;
      background: none;
      font-size: 16px;
      margin-left: 20px;
      grid-column: 4 / 6;
    }
  }
}
</style>
