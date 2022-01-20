<template>
  <div class="home">
    <About />
    <Recommended />
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
