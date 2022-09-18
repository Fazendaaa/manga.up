<template>
  <Display header="Random" :ids="recommendations" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getRandomMangas, IManga } from "@/scripts/mangadex";
import Display from "@/components/Display.vue";

export default defineComponent({
  name: "RandomComponent",

  components: {
    Display,
  },

  props: {
    numberOfItems: Number,
  },

  async setup(props) {
    const { numberOfItems } = toRefs(props);
    const recommendations: IManga[] = [];
    const amount = numberOfItems.value;

    for (const _ in [...Array(amount).keys()]) {
      recommendations.push(
        await getRandomMangas(["naruto", "boruto"], ["safe"])
      );
    }

    return {
      recommendations,
    };
  },
});
</script>
