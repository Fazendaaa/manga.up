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
        <v-autocomplete
          v-model:search="search"
          :loading="isLoading"
          hide-no-data
          hide-selected
          item-title="Description"
          item-value="API"
          label="Search Mangas..."
          placeholder="Start typing to Search"
          prepend-icon="mdi-card-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
    </v-card>

    <Suspense v-if="0 != entries.length">
      <template #default>
        <Display :header="header" :mangas="entries" />
      </template>
      <template #fallback>
        <div>loading results</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { IManga, searchManga } from "@/scripts/mangadex";
import { defineComponent, ref, watch } from "vue";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "SearchComponent",

  components: {
    Display,
  },

  setup() {
    const descriptionLimit = ref(60);
    const entries = ref<IManga[]>([]);
    const isLoading = ref(false);
    const model = ref(null);
    const search = ref("");
    const header = ref("");

    watch(search, async (newSearch) => {
      isLoading.value = true;
      entries.value = [];
      header.value = "";
      entries.value = await searchManga(newSearch, "5");
      header.value = "Results";
      isLoading.value = false;
    });

    return {
      descriptionLimit,
      entries,
      isLoading,
      model,
      search,
      header,
    };
  },
});
</script>
