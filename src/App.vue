<template>
  <v-app :theme="this.$store.state.theme">
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <NavBar />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    Header,
  },
  data() {
    return {
      //
    };
  },
});
</script>
