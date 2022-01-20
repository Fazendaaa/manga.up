<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Recommended</h1>

    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-btn small flat color="grey" @click="sortBy('title')">
          <v-icon small left>mdi-book</v-icon>
          <span class="caption text-lowercase">By manga name</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('score')">
          <v-icon small left>mdi-counter</v-icon>
          <span class="caption text-lowercase">By score</span>
        </v-btn>
      </v-layout>

      <v-card
        flat
        v-for="recommended in recommendations"
        :key="recommended.title"
      >
        <v-layout row wrap :class="`pa-3 manga ${recommended.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Name</div>
            <div>{{ recommended.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Chapters</div>
            <div>{{ recommended.chapters }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip
                small
                :class="`${recommended.status} white--text my-2 caption`"
                >{{ recommended.status }}</v-chip
              >
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
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
}

export default defineComponent({
  name: "RecommendedComponent",

  data() {
    return {
      recommendations: [
        {
          title: "Bleach",
          chapters: "400",
          score: "The Net Ninja",
          status: "ongoing",
        },
        {
          title: "Bersek",
          chapters: "357",
          score: "The Net Ninja",
          status: "complete",
        },
        {
          title: "One Piece",
          chapters: "1010",
          score: "The Net Ninja",
          status: "overdue",
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
