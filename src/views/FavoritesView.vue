<template>
  <Collection />
  <Readlist />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Collection from "@/components/Collection.vue";
import Readlist from "@/components/Readlist.vue";

export default defineComponent({
  name: "FavoritesComponent",
  data() {
    return {};
  },
  components: { Collection, Readlist },
});
</script>
<style lang="stylus"></style>
