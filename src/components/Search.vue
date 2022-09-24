<template>
  <v-card>
    <v-card-title v-html="$vuetify.locale.getScope().t('search.title')" />
    <v-card-text v-html="$vuetify.locale.getScope().t('search.subtitle')" />
    <v-card-text>
      <v-text-field
        v-model="search"
        filled
        :placeholder="$vuetify.locale.getScope().t('search.placeholder')"
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
