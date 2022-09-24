<template>
  <div class="ma-4 pa-4">
    <Suspense>
      <template #default>
        <Collection />
      </template>
      <template #fallback> loading lists... </template>
    </Suspense>
    <v-btn to="{ name: 'ReadList' }">
      <v-icon>mdi-format-list-text</v-icon>
      <span> Create a Readlist </span>
    </v-btn>
    <v-btn to="{ name: 'ReadList' }">
      <v-icon>mdi-folder-upload-outline</v-icon>
      <span> Upload a Readlist </span>
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
