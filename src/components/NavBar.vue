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
    class="hidden-lg-and-up"
    grow
    :value="value"
    color="primary"
  >
    <v-btn
      :loading="item.loading"
      v-for="item in menuItems"
      :key="item.title"
      :to="item.path"
      @click="loader(item)"
    >
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Item {
  title: string;
  path: string;
  icon: string;
  loading: boolean;
}

export default defineComponent({
  name: "NavBar",

  data() {
    return {
      value: 1,
      menuItems: [
        { title: "Home", path: "/", icon: "mdi-home-outline", loading: false },
        {
          title: "Search",
          path: "/search",
          icon: "mdi-card-search",
          loading: false,
        },
        {
          title: "Favorites",
          path: "/favorites",
          icon: "mdi-heart",
          loading: false,
        },
        {
          title: "Settings",
          path: "/settings",
          icon: "mdi-cog-outline",
          loading: false,
        },
      ],
    };
  },

  methods: {
    loader(item: Item) {
      item.loading = !item.loading;

      setTimeout(() => {
        // this[loadingState] = false;
      }, 1000);

      item.loading = !item.loading;
    },
  },
});
</script>
