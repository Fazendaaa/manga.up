<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon>mdi-palette-outline</v-icon>
        <span v-html="$vuetify.locale.t('settings.theme.title')" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-btn
          v-for="option in settings"
          :key="option.title"
          @click="this.$store.commit('setTheme', option.title)"
        >
          {{ option.title }}
        </v-btn>
        <br />
        <br />
        <v-divider />
        <br />
        <div>
          <v-btn>
            <span>Create your own</span>
          </v-btn>
          <v-btn>
            <span>Share your theme</span>
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { themeOptions } from "@/plugins/themes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThemesComponent",

  setup() {
    return {
      settings: themeOptions.map((item) => {
        return { title: item };
      }),
    };
  },
});
</script>
