<template>
  <div>
    <h1 class="subheading grey--text">About</h1>
    <v-container class="my-5">
      <p><strong>Manga.up</strong> is meant to be:</p>
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
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
          message: "an Free Software implementation",
        },
        {
          message: "test",
        },
      ],
    };
  },
});
</script>
