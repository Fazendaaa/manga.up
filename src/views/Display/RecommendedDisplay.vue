<template>
  <Display header="Recommended" :mangas="mangas" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga, IManga } from "@/scripts/mangadex";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "RecommendedComponent",

  components: {
    Display,
  },

  props: {
    numberOfItems: Number,
  },

  async setup(props) {
    const { numberOfItems } = toRefs(props);
    const titles = [
      "fullmetal alchemist",
      "jobless reincarnation",
      "sword art online",
      "danmachi",
      "psycho pass",
    ];
    const mangas: IManga[] = [];
    const amount = numberOfItems.value;

    // for (const _ in [...Array(amount).keys()]) {
    for (const title of titles) {
      mangas.push((await getManga(title))[0]);
    }

    return {
      mangas,
    };
  },
});
</script>
