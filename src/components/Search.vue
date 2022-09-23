<template>
  <div class="ma-4 pa-4">
    <v-card>
      <v-card-title> Just do it! </v-card-title>

      <v-card-text>
        You can always check the source at
        <a
          class="text-grey-lighten-3"
          href="https://mangadex.org/"
          target="_blank"
          rel="noopener noreferrer"
          >MangaDex</a
        >.
      </v-card-text>

      <v-card-text>
        <v-text-field
          v-model="search"
          filled
          placeholder="Search Mangas..."
          prepend-icon="mdi-card-search"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <Suspense v-if="'' !== search">
      <template #default>
        <SearchResults :search="search" />
      </template>
      <template #fallback>
        <div align="center">loading results</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchResults from "@/components/SearchResults.vue";

export default defineComponent({
  name: "SearchComponent",

  components: {
    SearchResults,
  },

  setup() {
    const search = ref("");

    return {
      search,
    };
  },
});
</script>
