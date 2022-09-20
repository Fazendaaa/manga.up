<template>
  <div id="gallery" align="center">
    <a
      v-for="(image, key) in items"
      :key="key"
      :href="image.src"
      :data-pswp-width="image.w"
      :data-pswp-height="image.h"
    >
      <img :src="image.thumbnail" :alt="`page-${key}`" />
    </a>
  </div>
  <ReaderNavigation />
</template>

<script lang="ts">
import { getChapter } from "@/scripts/manga";
import { defineComponent, toRefs } from "vue";
import ReaderNavigation from "./ReaderNavigation.vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";

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
    ReaderNavigation,
  },

  data() {
    return {
      lightbox: null,
    };
  },

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getChapter(id.value);
    const items: Image[] = [];

    for (const item of data) {
      items.push({
        src: item["image"],
        thumbnail: item["thumbnail"],
        w: item["width"],
        h: item["height"],
      });
    }

    return {
      items,
    };
  },

  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      this.lightbox.init();
    }
  },

  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
});
</script>

<style lang="scss" scoped>
@import "photoswipe/style.css";
</style>
