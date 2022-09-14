<template>
  <div>
    <h1 class="subheading grey--text">About</h1>
    <v-container class="my-5">
      <p><strong>Manga.up</strong> is meant to be:</p>
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
      <p>Besides helping you stay focus and up to date in your favorites</p>
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
          message: "A Free Software implementation -- 'free' as in beer",
        },
        {
          message: "test",
        },
      ],
    };
  },
});
</script>
