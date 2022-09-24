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
.v-select {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
</style>
