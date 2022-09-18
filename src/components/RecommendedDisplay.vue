<template>
  <Display header="Recommended" :ids="recommendations" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getRandomMangas } from "@/scripts/mangadex";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "RecommendedComponent",

  components: {
    Display,
  },

  props: {
    numberOfRecommendations: String,
  },

  async setup(props) {
    const { numberOfRecommendations } = toRefs(props);
    const recommendations: string[] = [];
    const amount = Number(numberOfRecommendations.value);

    for (const _ in [...Array(amount).keys()]) {
      recommendations.push(
        await getRandomMangas(["naruto", "boruto"], ["safe"]).then(
          (result) => result["attributes"]["title"]["en"]
        )
      );
    }

    return {
      recommendations,
    };
  },
});
</script>
