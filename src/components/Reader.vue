<template>
  <vue-picture-swipe :items="items" :options="options"></vue-picture-swipe>
</template>

<script lang="ts">
import { getChapter } from "@/scripts/manga";
import { resizeImage } from "@/scripts/utils";
import { defineComponent, toRefs } from "vue";
// @ts-expect-error: going to type it later
import VuePictureSwipe from "vue3-picture-swipe";

interface Image {
  src: string;
  thumbnail: string;
  w: number;
  h: number;
}

export default defineComponent({
  name: "ReaderComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  components: {
    VuePictureSwipe,
  },

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getChapter(id.value);
    const items: Image[] = [];

    for (const url of data) {
      // const thumbnail = resizeImage(url, 150, 150);

      items.push({
        src: url,
        // thumbnail,
        thumbnail: url,
        w: 1081,
        h: 1920,
      });
    }

    return {
      options: {
        shareEl: false,
        preload: [1, 4],
      },
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
v-img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px; /* Set a small width */
}

/* Add a hover effect (blue shadow) */
v-img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
