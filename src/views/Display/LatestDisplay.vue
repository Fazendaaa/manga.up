<template>
  <Display header="Latest" :mangas="mangas" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { searchManga, IManga } from "@/scripts/mangadex";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "LatestComponent",

  components: {
    Display,
  },

  props: {
    numberOfItems: Number,
  },

  async setup(props) {
    const { numberOfItems } = toRefs(props);
    const titles = [
      "boruto",
      "made in abyss",
      "overlord",
      "I'm Just a Side Character in a Dating Simulation",
      "Cultivate with a Fairy",
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
