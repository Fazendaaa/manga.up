<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon>mdi-cog-outline</v-icon>
        <span
          v-html="$vuetify.locale.getScope().t('settings.settings.title')"
        />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ul>
          <li v-for="option in settings" :key="option.title">
            {{ option.title }}
          </li>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsComponent",

  setup() {
    return {
      settings: [
        { title: "download user content" },
        { title: "notifications" },
        { title: "downloads" },
        { title: "devices" },
        { title: "my servers" },
      ],
    };
  },
});
</script>
