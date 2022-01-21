<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Recommended</h1>

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

      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="recommended in recommendations"
          :key="recommended.title"
        >
          <v-card
            flat
            class="text-xs-center ma-3 `pa-3 manga ${recommended.status}`"
          >
            <v-responsive class="pt-4">
              <v-avatar size="180" class="grey lighten-2">
                <img :src="recommended.cover" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ recommended.title }}</div>
              <div class="grey--text">{{ recommended.chapters }}</div>
              <div class="center">
                <v-chip
                  small
                  :class="`${recommended.status} white--text my-2 caption`"
                  >{{ recommended.status }}</v-chip
                >
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>mdi-book-open-variant</v-icon>
                <span class="">Read</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Recommended {
  title: string;
  chapters: string;
  score: string;
  status: string;
  cover: string;
}

export default defineComponent({
  name: "RecommendedComponent",

  data() {
    return {
      recommendations: [
        {
          title: "Bleach",
          chapters: "400",
          score: "7",
          status: "ongoing",
          cover: "https://www.coverbrowser.com/image/tv-series/1187-1.jpg",
        },
        {
          title: "Berserk",
          chapters: "357",
          score: "9.5",
          status: "complete",
          cover: "https://www.coverbrowser.com/image/berserk/1-1.jpg",
        },
        {
          title: "One Piece",
          chapters: "1010",
          score: "9",
          status: "overdue",
          cover: "https://www.coverbrowser.com/image/one-piece/1-1.jpg",
        },
        {
          title: "Naruto",
          chapters: "700",
          score: "5",
          status: "Finished",
          cover:
            "https://www.coverbrowser.com/image/bestselling-comics-2007/670-1.jpg",
        },
        {
          title: "HunterXHunter",
          chapters: "200",
          score: "8.5",
          status: "Overdue",
          cover:
            "https://www.coverbrowser.com/image/bestselling-comics-2006/1610-1.jpg",
        },
      ],
    };
  },
  methods: {
    sortBy(prop: string) {
      this.recommendations.sort((a: Recommended, b: Recommended) =>
        a[prop as keyof Recommended] < b[prop as keyof Recommended] ? -1 : 1
      );
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
