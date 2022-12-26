<template>
  <TheModal @close="closeModal()">
    <div class="postUpload">
      <label class="upload">
        <img v-if="uplodeImg" :src="uplodeImg" class="preview" />
        <TheIcon v-else icon="upload-image" />
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImgUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="寫點什麼吧..."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost">發布貼文</TheButton>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheIcon from "./TheIcon.vue";
import TheModal from "./TheModal.vue";
import TheButton from "./TheButton.vue";
import { useUserStore } from "../stores/user.js";
import { usePostStore } from "../stores/post.js";
import { ref } from "vue";

const userStore = useUserStore();
const postStore = usePostStore();
const uplodeImg = ref("");
const image = ref(null);
const description = ref("");

function closeModal() {
  userStore.changeShowPostModal(false);
}

function handleImgUpload(e) {
  const imgFile = e.target.files[0];
  if (imgFile) {
    uplodeImg.value = URL.createObjectURL(imgFile);
    image.value = imgFile;
  }
}

function publishPost() {
  postStore.uploadPost({ image: image.value, description: description.value });
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}

.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
  .upload {
    display: grid;
    place-items: center;
    cursor: pointer;
    min-height: 0;
    > svg {
      width: 254px;
      height: 316px;
    }
    .fileChooser {
      opacity: 0;
      position: absolute;
    }
  }

  .postContent {
    display: grid;
    .postContentInput {
      border-bottom: none;
      resize: none;
      padding: 12px 24px;
      ::placeholder {
        color: #757575;
      }
    }

    .pubBtn {
      align-self: end;
      justify-self: end;
      position: relative;
      right: 24px;
      bottom: 18px;
    }
  }
}
</style>
