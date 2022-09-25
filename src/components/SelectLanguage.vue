<template>
  <v-icon>mdi-translate</v-icon>
  <span
    variant="plain"
    class="caption text-lowercase"
    v-html="$vuetify.locale.getScope().t('selectLanguage.ask')"
  />
  <v-col flex align="left">
    <v-select
      v-model="chosenTranslation"
      :items="translations"
      flex
      style="max-height: 19px; max-width: 100px"
      density="compact"
    />
  </v-col>
</template>

<script lang="ts">
import { availableTranslations } from "@/plugins/i18n";
import { defineComponent, ref, watch } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "SelectLanguageComponent",

  setup() {
    const { current } = useLocale();
    const chosenTranslation = ref(current.value);
    const translations: string[] = availableTranslations;

    watch(chosenTranslation, (newTranslation) => {
      current.value = newTranslation;
      localStorage.setItem("translation", newTranslation);
    });

    return {
      translations,
      chosenTranslation,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-select {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
</style>
