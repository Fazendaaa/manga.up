<template>
  <v-icon>mdi-translate</v-icon>
  <span variant="plain" class="caption text-lowercase"> select idiom: </span>
  <v-col align="left">
    <v-select
      v-model="chosenTranslation"
      :items="translations"
      style="max-height: 22px; max-width: 100px"
      density="compact"
    ></v-select>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "SelectLanguageComponent",

  setup() {
    const chosenTranslation = ref("");
    const { current } = useLocale();
    const translations: string[] = [current.value, "pt"];

    watch(chosenTranslation, (newTranslation) => {
      current.value = newTranslation;
    });

    return {
      translations,
      chosenTranslation,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-field__input {
  color: inherit;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 0.009375em;
  opacity: var(--v-high-emphasis-opacity);
  min-height: 0;
  -webkit-padding-start: var(--v-field-padding-start);
  padding-inline-start: var(--v-field-padding-start);
  -webkit-padding-end: var(--v-field-padding-end);
  padding-inline-end: var(--v-field-padding-end);
  padding-top: calc(
    var(--v-field-padding-top, 10px) + var(--v-input-padding-top, 0)
  );
  padding-bottom: 0;
  width: 100%;
}
</style>
