<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">{{ header }}</h1>

    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-btn
              small
              flat
              v-bind="props"
              color="grey"
              @click="sortBy('title')"
            >
              <v-icon small left>mdi-book</v-icon>
              <span class="caption text-lowercase">By manga name</span>
            </v-btn>
          </template>
          <span>Sort manga by name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-btn
              small
              v-bind="props"
              flat
              color="grey"
              @click="sortBy('score')"
            >
              <v-icon small left>mdi-counter</v-icon>
              <span class="caption text-lowercase">By score</span>
            </v-btn>
          </template>
          <span>Sort manga by score</span>
        </v-tooltip>
      </v-layout>

      <Carousel :items-to-show="itemsToShow" :wrapAround="true">
        <Slide v-for="subject in subjects" :key="subject.title">
          <!-- https://ismail9k.github.io/vue3-carousel/examples.html#active-classes -->
          <div class="carousel__item">
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 lg3>
                <v-card
                  flat
                  class="text-xs-center ma-3 `pa-3 manga ${subject.status}`"
                >
                  <router-link
                    flat
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Info', params: { id: subject.id } }"
                  >
                    <v-responsive class="pt-4">
                      <v-avatar size="180" class="grey lighten-2">
                        <img
                          :src="subject.cover"
                          :width="size"
                          :height="size"
                        />
                      </v-avatar>
                    </v-responsive>
                    <v-card-text>
                      <div class="subheading">{{ subject.title }}</div>
                      <div class="grey--text">{{ subject.chapters }}</div>
                      <div class="center">
                        <v-chip
                          small
                          :class="`${subject.status} white--text my-2 caption`"
                          >{{ subject.status }}</v-chip
                        >
                      </div>
                    </v-card-text>
                  </router-link>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="grey"
                      custom
                      :to="{ name: 'Reader', params: { id: subject.id } }"
                    >
                      <v-icon small left>mdi-book-open-variant</v-icon>
                      <span>Read</span>
                    </v-btn>
                    <v-btn
                      flat
                      color="grey"
                      v-on:click="addToReadlist(subject.id)"
                    >
                      <v-icon small left>mdi-bookmark-plus-outline</v-icon>
                      <span class="">Add to Readlist</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </v-container>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { IManga, searchMangaCoverPreview } from "@/scripts/mangadex";

import "vue3-carousel/dist/carousel.css";

export interface Display {
  id: string;
  title: string;
  chapters: string;
  score: string;
  cover: string;
  status: string;
}

export default defineComponent({
  name: "DisplayComponent",

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  props: {
    header: String,
    // https://forum.vuejs.org/t/vue-typescript-problem-with-component-props-array-type-declaration/29478/15
    mangas: {
      type: Array as () => Array<IManga>,
      required: true,
      default: () => [],
    },
  },

  data: () => ({
    itemsToShow: 3,
  }),

  async setup(props) {
    const { mangas } = toRefs(props);
    const subjects = ref<Array<Display>>([]);

    for (const manga of mangas.value) {
      let chapters: string;

      switch (typeof manga["attributes"]["lastChapter"]) {
        case "string":
          chapters = manga["attributes"]["lastChapter"];

          if ("" === chapters && "ongoing" !== manga["attributes"]["status"]) {
            chapters = "?";
          }

          break;
        case "number":
          chapters = manga["attributes"]["lastChapter"].toString();
          break;
        default:
          chapters = "?";
      }

      for (const relationship of manga["relationships"]) {
        if ("cover_art" === relationship["type"]) {
          subjects.value.push({
            id: manga["id"],
            title: manga["attributes"]["title"]["en"],
            chapters,
            score: "10",
            status: manga["attributes"]["status"],
            cover: await searchMangaCoverPreview(
              manga["id"],
              relationship["id"]
            ),
          });
        }
      }
    }

    return {
      // https://stackoverflow.com/a/63688940/7092954
      subjects,
      size: 180,
    };
  },

  methods: {
    sortBy(prop: string) {
      this.subjects.sort((a: Display, b: Display) =>
        a[prop as keyof Display] < b[prop as keyof Display] ? -1 : 1
      );
    },

    addToReadlist(title: string) {
      alert(title);
    },

    onResize() {
      // xs
      if (window.innerWidth < 600) {
        this.itemsToShow = 1.5;
        return;
      }
      // sm
      if (600 <= window.innerWidth && window.innerWidth < 960) {
        this.itemsToShow = 3;
        return;
      }
      // md
      if (960 <= window.innerWidth && window.innerWidth < 1264) {
        this.itemsToShow = 5;
        return;
      }
      // lg
      if (1264 <= window.innerWidth && window.innerWidth < 1904) {
        this.itemsToShow = 6;
        return;
      }
      // lg
      else {
        this.itemsToShow = 10;
        return;
      }
    },
  },

  beforeUnmount() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize);
  },

  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },
});
</script>

<style scoped lang="scss">
.v-chip.completed {
  background: #18a17c;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.hiatus {
  background: #f83e70;
}
.v-chip.cancelled {
  background: #a1188a;
}
.v-chip.published {
  background: #f5c242;
}

.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}
</style>
