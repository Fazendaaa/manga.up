<template>
  <nav class="d-flex justify-center">
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Manga</span>
        <span>Up</span>
      </v-toolbar-title>
      <v-btn right icon flat @click="this.$store.commit('toggleTheme')">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadlineComponent",

  data() {
    return {};
  },
});
</script>
