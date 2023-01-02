<template>
  <Display :header="$vuetify.locale.t('display.trending')" :mangas="mangas" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { searchManga, IManga } from "@/scripts/mangadex";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "TrendingComponent",

  components: {
    Display,
  },

  props: {
    numberOfItems: Number,
  },

  async setup(props) {
    const { numberOfItems } = toRefs(props);
    const titles = [
      "highschool of the dead",
      "bleach",
      "one piece",
      "boku no hero",
      "Demon Slayer",
    ];
    const mangas: IManga[] = [];
    const amount = numberOfItems.value;

    // for (const _ in [...Array(amount).keys()]) {
    for (const title of titles) {
      mangas.push((await searchManga(title))[0]);
    }

    return {
      mangas,
    };
  },
});
</script>
