<template>
  <!-- UPPER -->
  <v-app-bar density="compact" class="hidden-md-and-down">
    <v-btn v-for="item in menuItems" :key="item.title" :to="item.path">
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- LOWER -->
  <v-bottom-navigation
    class="hidden-md-and-up"
    grow
    :value="value"
    color="primary"
  >
    <v-btn v-for="item in menuItems" :key="item.title" :to="item.path">
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
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
      menuItems: [
        { title: "Home", path: "/", icon: "mdi-home-outline" },
        { title: "Search", path: "/search", icon: "mdi-card-search" },
        { title: "Favorites", path: "/favorites", icon: "mdi-heart" },
        { title: "Settings", path: "/settings", icon: "mdi-cog-outline" },
      ],
    };
  },
});
</script>
