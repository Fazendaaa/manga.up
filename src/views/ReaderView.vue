<template>
  <div class>
    <Reader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Reader from "@/components/Reader.vue";

export default defineComponent({
  name: "ReaderView",
  components: {
    Reader,
  },
});
</script>
