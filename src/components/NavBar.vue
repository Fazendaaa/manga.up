<template>
  <v-bottom-navigation grow :value="value" color="primary">
    <v-btn router href="/">
      <span>Home</span>

      <v-icon>mdi-home-outline</v-icon>
    </v-btn>

    <v-btn router href="/search">
      <span>Search</span>

      <v-icon>mdi-card-search</v-icon>
    </v-btn>

    <v-btn router href="/favorites">
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn router href="/settings">
      <span>Settings</span>

      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",

  data() {
    return {
      value: 1,
    };
  },
});
</script>
