<template>
  <div :class="{ center: $vuetify.display.xs && this.$store.state.full }">
    <div v-if="error" v-html="$vuetify.locale.t('favorites.error')" />
    <Suspense v-else>
      <template #default>
        <Collection />
      </template>
      <template #fallback>
        <v-progress-linear color="orange" indeterminate reverse />
      </template>
    </Suspense>
    <div>
      <v-btn :to="{ name: 'Scan' }">
        <v-icon>mdi-qrcode-scan</v-icon>
        <span v-html="$vuetify.locale.t('favorites.buttons.scan')" />
      </v-btn>

      <v-btn to="{ name: 'ReadList' }">
        <v-icon>mdi-format-list-text</v-icon>
        <span v-html="$vuetify.locale.t('favorites.buttons.create')" />
      </v-btn>

      <v-btn to="{ name: 'ReadList' }">
        <v-icon>mdi-folder-upload-outline</v-icon>
        <span v-html="$vuetify.locale.t('favorites.buttons.upload')" />
      </v-btn>
    </div>
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

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;

      return true;
    });

    return {
      error,
      errorMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.center {
  position: fixed;
  top: 35%;
  max-width: 100%;
}
</style>
