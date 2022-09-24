<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon>mdi-account-box-outline</v-icon>
        <span v-html="$vuetify.locale.getScope().t('settings.user.title')" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-avatar size="180" class="grey lighten-2">
          <v-img
            src="https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true"
          />
        </v-avatar>
        <br />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserComponent",
});
</script>
