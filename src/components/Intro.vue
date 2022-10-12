<template>
  <v-card>
    <v-card-text class="my-5">
      <div class="text-h3"><strong>Manga.up</strong></div>
      <div
        class="text-h6"
        v-html="$vuetify.locale.getScope().t('intro.subtitle')"
      />
      <div
        class="text-subtitle-2 grey--text"
        v-html="$vuetify.locale.getScope().t('intro.preview')"
      />
      <v-expansion-panels variant="inset" class="my-4">
        <v-expansion-panel>
          <v-expansion-panel-title
            v-html="$vuetify.locale.getScope().t('intro.panel')"
          />
          <v-expansion-panel-text>
            <v-icon :icon="$vuetify.locale.getScope().t('intro.status.icon')" />
            <span
              v-html="$vuetify.locale.getScope().t('intro.status.message')"
            />
            <br />
            <p v-html="$vuetify.locale.getScope().t('intro.content')" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-btn :to="{ name: 'About' }">
        <v-icon>mdi-information-outline</v-icon>
        <span v-html="$vuetify.locale.getScope().t('intro.about')" />
      </v-btn>
      <v-btn :to="{ name: 'Contact' }">
        <v-icon>mdi-human-greeting-proximity</v-icon>
        <span v-html="$vuetify.locale.getScope().t('intro.contact')" />
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IntroComponent",
});
</script>
