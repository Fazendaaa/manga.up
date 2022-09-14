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

      <carousel :items-to-show="1">
        <slide v-for="slide in 10" :key="slide">
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              lg3
              v-for="subject in subjects"
              :key="subject.title"
            >
              <v-card
                flat
                class="text-xs-center ma-3 `pa-3 manga ${subject.status}`"
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
                <v-card-actions>
                  <v-btn
                    flat
                    color="grey"
                    :to="{ name: 'Info', params: { id: subject.title } }"
                    custom
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
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

interface Subject {
  title: string;
  chapters: string;
  score: string;
  status: string;
  cover: string;
}

export default defineComponent({
  name: "DisplayComponent",

  components: {
    Carousel,
    // Slide,
    Pagination,
    Navigation,
  },

  props: {
    header: String,
    // https://forum.vuejs.org/t/vue-typescript-problem-with-component-props-array-type-declaration/29478/15
    subjects_prop: {
      type: Array as () => Array<Subject>,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      // https://stackoverflow.com/a/63688940/7092954
      subjects: this.subjects_prop,
      size: 180,
    };
  },
  methods: {
    sortBy(prop: string) {
      this.subjects.sort((a: Subject, b: Subject) =>
        a[prop as keyof Subject] < b[prop as keyof Subject] ? -1 : 1
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
</style>
