<template>
  <v-system-bar>
    <v-icon icon="mdi-connection"></v-icon>
    <span class="caption text-lowercase"> Mangadex status: </span>
    <div v-if="error">Error while loading this status</div>
    <Suspense v-else>
      <template #default>
        <Status />
      </template>
      <template #fallback> loading status... </template>
    </Suspense>
  </v-system-bar>
  <nav class="d-flex justify-center">
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Manga</span>
        <span>Up</span>
      </v-toolbar-title>
      <v-btn right icon flat @click="this.$store.commit('toggleTheme')">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import Status from "./Status.vue";

export default defineComponent({
  name: "HeadlineComponent",

  components: {
    Status,
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
