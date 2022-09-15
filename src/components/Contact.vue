<template>
  <div>
    <h1 class="subheading grey--text">Contact</h1>
    <v-container class="my-5">
      <v-btn target="_blank" href="https://github.com/Fazendaaa/manga.up">
        <v-icon>mid-github</v-icon>
        <span>Give us a like so we can keep going</span>
      </v-btn>
      <v-btn target="_blank" href="https://twitter.com/mangaupofficial">
        <v-icon>mid-twitter</v-icon>
        <span>Twitter</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactComponent",

  data() {
    return {};
  },
});
</script>
