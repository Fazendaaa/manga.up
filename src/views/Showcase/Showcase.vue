<template>
  <LatestShowcase :numberOfItems="numberOfItems" />
  <RecommendedShowcase :numberOfItems="numberOfItems" />
  <TrendingShowcase :numberOfItems="numberOfItems" />
  <RandomShowcase :numberOfItems="numberOfItems" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LatestShowcase from "@/views/Showcase/LatestShowcase.vue";
import TrendingShowcase from "@/views/Showcase/TrendingShowcase.vue";
import RecommendedShowcase from "@/views/Showcase/RecommendedShowcase.vue";
import RandomShowcase from "@/views/Showcase/RandomShowcase.vue";

export default defineComponent({
  name: "ShowcaseView",

  components: {
    LatestShowcase,
    TrendingShowcase,
    RandomShowcase,
    RecommendedShowcase,
  },

  setup() {
    return {
      numberOfItems: 3,
    };
  },
});
</script>
