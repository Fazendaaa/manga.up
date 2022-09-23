<template>
  <div class="ma-4 pa-4">
    <Collection />
    <v-btn to="{ name: 'ReadList' }">
      <v-icon>mdi-format-list-text</v-icon>
      <span>Create a Readlist</span>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Collection from "@/components/Collection.vue";

export default defineComponent({
  name: "FavoritesComponent",

  components: {
    Collection,
  },
});
</script>
