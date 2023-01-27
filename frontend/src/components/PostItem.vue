<template>
  <div class="postItem">
    <img
      :src="data.image"
      width="100%"
      height="100%"
      style="background: #eee"
      @click="postStore.showDetail(data.id)"
    />
    <div class="postInfo">
      <div class="postMeta">
        <TheAvatar :src="formatAvatar(data?.user?.avatar)" />
        <span>{{ data?.user?.name || "Author" }}</span>
        <span class="postPubDate">
          {{ dateToRelative(data?.publishedAt) || "12 hours ago published" }}
        </span>
        <PostActions
          :likes="data?.liked_bies"
          :comments="data?.comments"
          :favors="data?.favored_bies"
          :isLikedByMe="data?.likedByMe"
          :isFavoredByMe="data?.favoredByMe"
          @likeClick="postStore.toggleLike(data.id)"
          @favorClick="postStore.toggleFavorite(data.id)"
          @commentsClick="postStore.showDetail(data.id)"
        />
      </div>
      <div class="postDesc">
        <p>{{ data?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheAvatar from "../components/TheAvatar.vue";
import PostActions from "../components/PostActions.vue";
import { usePostStore } from "../stores/post.js";
import { dateToRelative } from "../utils/date.js";

const postStore = usePostStore();

function formatAvatar(avatar) {
  if (avatar === null) {
    return;
  }
  return `http://localhost:1337${avatar.split("?")[0]}`;
}

defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.postItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  > img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    background: #eee;
    cursor: pointer;
  }
  .postInfo {
    padding: 24px;
    .postMeta {
      display: grid;
      grid-template-areas:
        "avatar name actions"
        "pubDate pubDate actions";
      grid-template-columns: 42px 1fr 3fr;
      row-gap: 6px;
      .postPubDate {
        grid-area: pubDate;
        color: #9f9f9f;
        font: 14px;
      }
    }

    .postActions {
      grid-area: actions;
      justify-self: end;
    }

    .postDesc {
      margin-top: 28px;
      white-space: pre-line;
    }
  }
}
</style>
