<template>
  <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
    <v-btn variant="outlined">
      <v-icon>mdi-skip-previous</v-icon>
      <span>Previous Chapter</span>
    </v-btn>
    <v-btn variant="outlined">
      <v-icon>mdi-skip-next</v-icon>
      <span>Next Chapter</span>
    </v-btn>
  </div>
  <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
    <v-btn variant="outlined">
      <v-icon>mdi-skip-backward</v-icon>
      <span>Previous Volume</span>
    </v-btn>
    <v-btn>
      <v-icon>mdi-book</v-icon>
      <span>Back to Manga</span>
    </v-btn>
    <v-btn variant="outlined">
      <v-icon>mdi-skip-forward</v-icon>
      <span>Next Volume</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReaderNavigationComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  // setup() {
  //   return {
  //     id: 1,
  //   };
  // },
});
</script>
