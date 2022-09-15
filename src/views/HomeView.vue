<template>
  <div class="home">
    <Intro />
    <suspense>
      <template #default>
        <Display header="Latest" :subjects_prop="latest" />
        <Display header="Trending" :subjects_prop="trending" />
        <Display header="Recommended" :subjects_prop="recommendations" />
      </template>
      <template #fallback> Loading... </template>
    </suspense>
    <Stores />
    <Contact />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Intro from "@/components/Intro.vue";
import Contact from "@/components/Contact.vue";
import Display from "@/components/Display.vue";
import { Subject } from "@/components/Display.vue";
import Stores from "@/components/Stores.vue";
import { getMangaCover } from "@/scripts/mangadex";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Contact,
    Display,
    Stores,
  },

  setup() {
    const recommendations = ref<Array<Subject>>([]);
    const trending = ref<Array<Subject>>([]);
    const latest = ref<Array<Subject>>([]);

    for (const title of ["Bleach", "Berserk", "One Piece"]) {
      getMangaCover("Bleach").then((cover) => {
        recommendations.value.push({
          cover,
          title,
          chapters: "400",
          score: "7",
          status: "ongoing",
        });
      });
    }
    for (const title of ["Naruto", "HunterXHunter", "One Piece"]) {
      getMangaCover("Bleach").then((cover) => {
        trending.value.push({
          cover,
          title,
          chapters: "400",
          score: "7",
          status: "ongoing",
        });
      });
    }
    for (const title of [
      "Highschool of The Dead",
      "Shingeki no Kyojin",
      "Vinland Saga",
    ]) {
      getMangaCover("Bleach").then((cover) => {
        latest.value.push({
          cover,
          title,
          chapters: "400",
          score: "7",
          status: "ongoing",
        });
      });
    }

    return {
      recommendations,
      trending,
      latest,
    };
  },
});
</script>
