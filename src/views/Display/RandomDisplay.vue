<template>
  <Display
    :header="$vuetify.locale.getScope().t('display.random')"
    :mangas="mangas"
  />
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
    const mangas: IManga[] = [];
    const amount = numberOfItems.value;

    for (const _ in [...Array(amount).keys()]) {
      mangas.push(await getRandomMangas(["naruto", "boruto"], ["safe"]));
    }

    return {
      mangas,
    };
  },
});
</script>
