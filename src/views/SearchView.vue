<template>
  <div :class="{ center: $vuetify.display.xs }">
    <Search />
    <!-- <Sources /> -->
  </div>
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

<style lang="scss" scoped>
.center {
  position: fixed;
  top: 40%;
  width: 100%;
}
</style>
