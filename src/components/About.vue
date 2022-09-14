<template>
  <div>
    <h1 class="subheading grey--text">About</h1>
    <h2 class="subheading grey--text">Goals</h2>
    <v-container class="my-5">
      <p><strong>Manga.up</strong> is meant to be:</p>
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
    </v-container>
    <h2 class="subheading grey--text">Security</h2>
    <v-container class="my-5">
      <p>
        Besides helping you stay focus and up to date in your favorites the idea
        behind <strong>Manga.up</strong> is also to act like an true
        application, the user won't need to send us any kind of information,
        your data will be encrypted and stored in your device and your device
        only it will be able
      </p>
    </v-container>
    <h2 class="subheading grey--text">Security</h2>
    <v-container class="my-5">
      <p>
        Besides helping you stay focus and up to date in your favorites the idea
        behind <strong>Manga.up</strong> is also to act like an true
        application, the user won't need to send us any kind of information,
        your data will be encrypted and stored in your device and your device
        only it will be able
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutComponent",

  data() {
    return {
      items: [
        {
          message: "A free software implementation -- 'free' as in beer",
        },
        {
          message: "test",
        },
      ],
    };
  },
});
</script>
