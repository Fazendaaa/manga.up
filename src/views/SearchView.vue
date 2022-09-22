<template>
  <Search />
  <!-- <Sources /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "@/components/Search.vue";
// import Sources from "@/components/Sources.vue";

export default defineComponent({
  name: "SearchView",

  components: {
    Search,
    // Sources,
  },
});
</script>

<style lang="scss"></style>
