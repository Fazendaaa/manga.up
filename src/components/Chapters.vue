<template>
  <p>{{ id }}: Chapters</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChaptersComponent",
  props: {
    id: String,
  },
});
</script>
