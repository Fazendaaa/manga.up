<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">{{ header }}</h1>

    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              flat
              v-bind="attrs"
              v-on="on"
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              v-bind="attrs"
              v-on="on"
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

      <Carousel :items-to-show="3" :wrapAround="true">
        <Slide v-for="subject in subjects" :key="subject.title">
          <!-- https://ismail9k.github.io/vue3-carousel/examples.html#active-classes -->
          <!-- <div class="carousel__item"> -->
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3>
              <v-card
                flat
                class="text-xs-center ma-3 `pa-3 manga ${subject.status}`"
              >
                <router-link
                  flat
                  style="text-decoration: none; color: inherit"
                  :to="{ name: 'Info', params: { id: subject.title } }"
                >
                  <v-responsive class="pt-4">
                    <v-avatar size="180" class="grey lighten-2">
                      <img :src="subject.cover" :width="size" :height="size" />
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
                    :to="{ name: 'Reader', params: { id: subject.title } }"
                  >
                    <v-icon small left>mdi-book-open-variant</v-icon>
                    <span>Read</span>
                  </v-btn>
                  <v-btn
                    flat
                    color="grey"
                    v-on:click="addToReadlist(subject.title)"
                  >
                    <v-icon small left>mdi-bookmark-plus-outline</v-icon>
                    <span class="">Add to Readlist</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- </div> -->
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
import { toRefs, defineComponent } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { IManga, getMangaCoverPreview } from "@/scripts/mangadex";

import "vue3-carousel/dist/carousel.css";

export interface Display {
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

  async setup(props) {
    const { mangas } = toRefs(props);
    const subjects: Display[] = [];

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
          subjects.push({
            title: manga["attributes"]["title"]["en"],
            chapters,
            score: "10",
            status: manga["attributes"]["status"],
            cover: await getMangaCoverPreview(manga["id"], relationship["id"]),
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
  },
});
</script>

<style scoped lang="scss">
.manga.complete {
  border-left: 4px solid #3cd1c2;
}
.manga.ongoing {
  border-left: 4px solid orange;
}
.manga.overdue {
  border-left: 4px solid tomato;
}
v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
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
