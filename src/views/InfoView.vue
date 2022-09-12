<template>
  <div>
    <Info />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Info from "@/components/Info.vue";

export default defineComponent({
  name: "InfoView",
  components: {
    Info,
  },
});
</script>
