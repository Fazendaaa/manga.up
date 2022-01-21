<template>
  <Collection />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Collection from "@/components/Collection.vue";

export default defineComponent({
  name: "FavoritesComponent",
  data() {
    return {};
  },
  components: { Collection },
});
</script>
<style lang="stylus"></style>
