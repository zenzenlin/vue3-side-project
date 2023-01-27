import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 前後端運行路徑端口不同，發送請求會有跨域問題
  server: {
    proxy: {
      // url 傳送 /api 開頭的請求會帶上至設定的路徑後面進行發送
      "/api": "http://localhost:1337/",
      "/upload": "http://localhost:1337/",
    },
  },
});
