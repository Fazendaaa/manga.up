<template>
  <Intro />
  <Showcase />
  <Contact />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/Intro.vue";
import Contact from "@/components/Contact.vue";
import Showcase from "@/views/Showcase/Showcase.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Contact,
    Showcase,
  },
});
</script>
