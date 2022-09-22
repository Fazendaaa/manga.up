<template>
  <div id="gallery" align="center">
    <a
      v-for="(image, key) in items"
      :key="key"
      :href="image.src"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
    >
      <img :src="image.thumbnail" :alt="`page-${key}`" />
    </a>
  </div>
</template>

<script lang="ts">
import { getChapterImages } from "@/scripts/manga";
import { defineComponent, toRefs } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";

interface Image {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
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

  data() {
    return {
      lightbox: null,
    };
  },

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getChapterImages(id.value);
    const items: Image[] = [];

    for (const item of data) {
      items.push({
        src: item["image"],
        thumbnail: item["thumbnail"],
        width: item["width"],
        height: item["height"],
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
        loop: false,
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
