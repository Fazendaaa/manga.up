<template>
  <div id="gallery" align="center">
    <a
      v-for="(image, key) in items"
      :key="key"
      :href="image.src"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      :id="`page-${key}-link`"
    >
      <img
        :src="image.thumbnail"
        :id="`page-${key}-img`"
        :alt="`page-${key}`"
      />
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
import { addToHistory } from "@/scripts/reading";

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

interface IPoint {
  x: number;
  y: number;
}

interface IGallery {
  gallery: HTMLElement;
}

interface ILightBox {
  loadAndOpen: (
    index: number,
    dataSource?: IGallery,
    point?: IPoint | null
  ) => void;
}

export default defineComponent({
  name: "ReaderComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
    page: {
      type: String,
      required: false,
      default: "0",
    },
  },

  async setup(props) {
    const lightbox = ref<ILightBox>();
    const history = ref([]);
    const { id } = toRefs(props);
    const lastPage = ref(0);
    const data = await getChapterImages(id.value);
    const chapter = await getChapter(id.value);
    const translatedLanguage = chapter.attributes.translatedLanguage;
    const mangaID = chapter.relationships.filter(
      (item) => "manga" === item.type
    )[0].id;
    const issues = await relativeIssues(
      id.value.toLowerCase(),
      await getMangaIssues(mangaID, [translatedLanguage])
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
      lightbox,
      history,
      mangaID,
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
          this.history = [];
          addToHistory(this.mangaID, this.issues.chapter.current.id);
          this.$router.push({
            name: "Reader",
            params: {
              id: this.issues.chapter.next.id,
            },
            query: {
              open: true,
            },
          });
        }

        // Move previous chapter
        const lastItem = this.history.length - 1;
        const lastVisited = this.history[lastItem - 2];
        if (this.lastPage - 3 === content.index && 1 === lastVisited) {
          this.history = [];
          addToHistory(this.mangaID, this.issues.chapter.current.id);
          this.$router.push({
            name: "Reader",
            params: {
              id: this.issues.chapter.previous.id,
            },
            query: {
              open: true,
              page: "-1",
            },
          });
        }

        this.history.push(content.index);
      });
      if (this.open) {
        const page = "-1" === this.page ? this.lastPage - 1 : this.page;
        const firstPage = document.getElementById(
          `page-${page}-link`
        ) as HTMLElement;
        firstPage.click();
      }
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
