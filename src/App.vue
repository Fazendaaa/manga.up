<template>
  <v-app :theme="this.$store.state.theme">
    <v-main>
      <router-view />
    </v-main>
    <NavBar />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      //
    };
  },
});
</script>
