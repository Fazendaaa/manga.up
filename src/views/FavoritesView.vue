<template>
  <div v-if="error" v-html="$vuetify.locale.getScope().t('favorites.error')" />
  <Suspense v-else>
    <template #default>
      <Collection />
    </template>
    <template #fallback>
      <v-progress-linear
        color="orange"
        indeterminate
        reverse
      ></v-progress-linear>
    </template>
  </Suspense>
  <div>
    <v-btn to="{ name: 'ReadList' }">
      <v-icon>mdi-format-list-text</v-icon>
      <span v-html="$vuetify.locale.getScope().t('favorites.buttons.create')" />
    </v-btn>
    <v-btn to="{ name: 'ReadList' }">
      <v-icon>mdi-folder-upload-outline</v-icon>
      <span v-html="$vuetify.locale.getScope().t('favorites.buttons.upload')" />
    </v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import Collection from "@/components/Collection.vue";

export default defineComponent({
  name: "FavoritesComponent",

  components: {
    Collection,
  },

  setup() {
    const error = ref(false);
    const errorMessage = ref("");
    const cached = false;

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    return {
      error,
      cached,
      errorMessage,
    };
  },
});
</script>
