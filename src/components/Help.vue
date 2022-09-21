<template>
  <div>
    <h1 class="subheading grey--text">Help</h1>
    <v-container class="my-5">
      <p>
        Here are some sources so you can choose to help in any way you can this
        project:
      </p>
    </v-container>
    <v-container class="my-5">
      <v-btn target="_blank" href="https://github.com/Fazendaaa/manga.up">
        <v-icon>mdi-github</v-icon>
        <span>Share a few translations or code</span>
      </v-btn>
      <v-btn target="_blank" href="https://twitter.com/the_fznd">
        <v-icon>mdi-twitter</v-icon>
        <span>Follow creator's Twitter</span>
      </v-btn>
      <v-btn target="_blank" href="https://www.buymeacoffee.com/fazenda">
        <v-icon>mdi-coffee</v-icon>
        <span>Buy me a coffee</span>
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
