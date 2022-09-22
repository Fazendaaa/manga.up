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
import {
  getChapterImages,
  getChapter,
  relativeIssues,
  getMangaIssues,
} from "@/scripts/manga";
import { defineComponent, ref, toRefs } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";

interface Image {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
}

interface IContent {
  data: unknown;
  displayedImageHeight: number;
  displayedImageWidth: number;
  element: unknown;
  hasSlide: boolean;
  height: number;
  index: number;
  instance: unknown;
  isAttached: boolean;
  isDecoding: boolean;
  placeholder: unknown;
  slide: unknown;
  state: string;
  type: string;
  width: number;
}

interface ILightBoxEvent {
  content: IContent;
  isLazy: boolean;
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
      history: [],
    };
  },

  async setup(props) {
    const { id } = toRefs(props);
    const lastPage = ref(0);
    const data = await getChapterImages(id.value);
    const chapter = await getChapter(id.value);
    const translatedLanguage = chapter.attributes.translatedLanguage;
    const mangaID = chapter.relationships.filter(
      (item) => "manga" === item.type
    );
    const issues = await relativeIssues(
      id.value.toLowerCase(),
      await getMangaIssues(mangaID[0].id, [translatedLanguage])
    );
    const items: Image[] = [];

    for (const item of data) {
      items.push({
        src: item["image"],
        thumbnail: item["thumbnail"],
        width: item["width"],
        height: item["height"],
      });
    }

    lastPage.value = data.length;

    return {
      items,
      issues,
      lastPage,
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
      this.lightbox.on("contentLoad", ({ content }: ILightBoxEvent) => {
        // Move next chapter
        if (2 === content.index && this.history.length > 3) {
          this.$router.push({
            name: "Reader",
            params: { id: this.issues.chapter.next.id },
          });
          this.history = [];
        }

        // Move previous chapter
        const lastItem = this.history.length - 1;
        const lastVisited = this.history[lastItem - 2];
        if (this.lastPage - 3 === content.index && 1 === lastVisited) {
          this.$router.push({
            name: "Reader",
            params: { id: this.issues.chapter.previous.id },
          });
          this.history = [];
        }

        this.history.push(content.index);
      });
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
