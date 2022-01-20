<template>
  <div>
    <h1 class="subheading grey--text">Help</h1>
    <v-container class="my-5">
      <v-btn href="https://github.com/Fazendaaa/manga.up">
        <span>Github</span>
        <v-icon> mid-github </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelpComponent",

  data() {
    return {};
  },
});
</script>
