<template>
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

  <v-progress-linear
    v-if="loading"
    indeterminate
    color="cyan"
  ></v-progress-linear>

  <Suspense v-if="'' !== search">
    <template #default>
      <SearchResults :search="search" />
    </template>
    <template #fallback></template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import SearchResults from "@/components/SearchResults.vue";

export default defineComponent({
  name: "SearchComponent",

  components: {
    SearchResults,
  },

  setup() {
    const search = ref("");
    const loading = ref(false);

    watch(search, () => {
      loading.value = true;
      // TODO(Fazendaaa): this is ugly, jerry-rigged AF but works
      setTimeout(() => (loading.value = false), 2000);
    });

    return {
      search,
      loading,
    };
  },
});
</script>
