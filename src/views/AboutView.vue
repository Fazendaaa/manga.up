<template>
  <div class="ma-4 pa-4">
    <About />
    <Help />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import About from "@/components/About.vue";
import Help from "@/components/Help.vue";

export default defineComponent({
  name: "AboutView",
  components: {
    About,
    Help,
  },
});
</script>
