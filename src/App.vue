<template>
  <v-no-ssr>
    <v-app :theme="this.$store.state.theme">
      <v-main>
        <Headline />
        <NavBar />
        <router-view :key="$route.path" />
      </v-main>
    </v-app>
  </v-no-ssr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import Headline from "@/components/Headline.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    Headline,
  },
  data() {
    return {
      //
    };
  },
});
</script>
