<template>
  <div>
    <h1
      class="subheading grey--text"
      v-html="$vuetify.locale.getScope().t('help.title')"
    />
    <v-container class="my-5">
      <p v-html="$vuetify.locale.getScope().t('help.content')" />
    </v-container>
    <v-container class="my-5">
      <div v-for="item in items" v-bind:key="item.href">
        <v-btn target="_blank" :href="item.href">
          <v-icon :icon="item.icon" />
          <span>{{ item.message }}</span>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "HelpComponent",

  data() {
    const translator = useLocale();

    return {
      items: [
        {
          href: "https://github.com/Fazendaaa/manga.up",
          icon: "mdi-github",
          message: translator.t("help.github"),
        },
        {
          href: "https://twitter.com/the_fznd",
          icon: "mdi-twitter",
          message: translator.t("help.twitter"),
        },
        {
          href: "https://www.buymeacoffee.com/fazenda",
          icon: "mdi-coffee",
          message: translator.t("help.buyMeACoffee"),
        },
      ],
    };
  },
});
</script>
