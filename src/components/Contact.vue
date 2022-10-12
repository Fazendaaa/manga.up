<template>
  <div>
    <h1
      class="subheading grey--text"
      v-html="$vuetify.locale.getScope().t('contact.title')"
    />
    <v-container class="my-5">
      <p v-html="$vuetify.locale.getScope().t('contact.message')" />
      <br />
      <v-btn
        target="_blank"
        href="https://github.com/Fazendaaa/manga.up/issues"
      >
        <v-icon>mdi-github</v-icon>
        <span v-html="$vuetify.locale.getScope().t('contact.github')" />
      </v-btn>
      <v-btn target="_blank" href="https://twitter.com/mangaupofficial">
        <v-icon>mdi-twitter</v-icon>
        <span v-html="$vuetify.locale.getScope().t('contact.twitter')" />
      </v-btn>
      <v-btn
        target="_blank"
        href="mailto:manga.up.official@gmail.com?subject = Contact&body = Message"
      >
        <v-icon>mdi-email</v-icon>
        <span v-html="$vuetify.locale.getScope().t('contact.email')" />
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactComponent",
});
</script>
