<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon>mdi-login</v-icon>
        <span v-html="$vuetify.locale.t('settings.logins.title')" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-avatar size="180" class="grey lighten-2">
          <v-img :src="src" />
        </v-avatar>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { MISSING_IMAGE } from "@/scripts/mangadex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",

  setup() {
    return {
      src: MISSING_IMAGE,
    };
  },
});
</script>
