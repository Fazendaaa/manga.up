<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import Search from '@/components/Search.vue'
  import ToggleDarkMode from '@/components/ToggleDarkMode.vue'
  import Reader from './components/Reader.vue'
</script>

<template>
  <div class="container-center">
    <img alt="Vue logo" src="/pwa-512x512.png" />
    <h1>manga.up</h1>
    <Search />
    <ToggleDarkMode />
    <Reader />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  .container-center {
    background-color: var(--background-color-primary);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :root {
    --background-color-primary: #ebebeb;
    --background-color-secondary: #fafafa;
    --accent-color: #cacaca;
    --text-primary-color: #222;
    --element-size: 4rem;
  }

  :root.dark-theme {
    --background-color-primary: #1e1e1e;
    --background-color-secondary: #2d2d30;
    --accent-color: #3f3f3f;
    --text-primary-color: #ddd;
  }
</style>
