<template>
  <div class="home">
    <About />
    <Display header="Latest" />
    <Display header="Trending" />
    <Display header="Recommended" />
    <Stores />
    <Help />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import About from "@/components/About.vue";
import Help from "@/components/Help.vue";
import Display from "@/components/Display.vue";
import Stores from "@/components/Stores.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    About,
    Help,
    Display,
    Stores,
  },
});
</script>
