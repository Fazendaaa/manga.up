<template>
  <div class="ma-4 pa-4">
    <Intro />
    <Showcase />
    <Stores />
    <Contact />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/Intro.vue";
import Contact from "@/components/Contact.vue";
import Stores from "@/components/Stores.vue";
import Showcase from "@/views/Showcase/Showcase.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Contact,
    Stores,
    Showcase,
  },
});
</script>
