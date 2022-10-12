<template>
  <Intro />
  <Showcase />
  <Social />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/Intro.vue";
import Social from "@/components/Social.vue";
import Showcase from "@/views/Showcase/Showcase.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Social,
    Showcase,
  },
});
</script>
