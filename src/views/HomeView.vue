<template>
  <div class="home">
    <About />
    <p>Trending</p>
    <p>Latest</p>
    <Recommended />
    <p>Sources Store</p>
    <Help />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import About from "@/components/About.vue";
import Recommended from "@/components/Recommended.vue";
import Help from "@/components/Help.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    About,
    Recommended,
    Help,
  },
});
</script>
