<template>
  <template v-if="$route.name !== 'Login'">
    <header class="header">
      <navbar />
    </header>
    <TheLayout>
      <router-view></router-view>
    </TheLayout>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
  <footer :class="['footer', { inside: $route.name === 'Login' }]">
    &copy Zenzen All Rights Reserved.
  </footer>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import "./assets/base.css";
import Navbar from "./components/Navbar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

.footer {
  text-align: center;
  padding: 38px 0;
  color: #828282;
  &.inside {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
