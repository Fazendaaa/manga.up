<template>
  <v-bottom-navigation grow :value="value" color="primary">
    <v-btn>
      <span>Search</span>

      <v-icon>mdi-card-search</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>About</span>

      <v-icon>mdi-information-outline</v-icon>
    </v-btn>

    <v-btn @click="this.$store.commit('toggleTheme')">
      <span> toggle theme </span>

      <v-icon right>mdi-theme-light-dark</v-icon>
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
