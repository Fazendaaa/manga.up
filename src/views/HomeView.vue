<template>
  <div class="home">
    <About />
    <Display header="Latest" :subjects_prop="latest" />
    <Display header="Trending" :subjects_prop="trending" />
    <Display header="Recommended" :subjects_prop="recommendations" />
    <Stores />
    <Help />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import About from "@/components/About.vue";
import Help from "@/components/Help.vue";
import Display from "@/components/Display.vue";
import Stores from "@/components/Stores.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    About,
    Help,
    Display,
    Stores,
  },
  data() {
    return {
      recommendations: [
        {
          title: "Bleach",
          chapters: "400",
          score: "7",
          status: "ongoing",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/06/35v1-660x1024.jpg",
        },
        {
          title: "Berserk",
          chapters: "357",
          score: "9.5",
          status: "complete",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/05/607v1-720x1024.jpg",
        },
        {
          title: "One Piece",
          chapters: "1010",
          score: "9",
          status: "overdue",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/04/one-piece-manga-cover-1-1.jpeg",
        },
      ],
      trending: [
        {
          title: "Naruto",
          chapters: "700",
          score: "5",
          status: "Finished",
          cover: "https://mangacovers.com/wp-content/uploads/2020/04/01-4.jpg",
        },
        {
          title: "HunterXHunter",
          chapters: "200",
          score: "8.5",
          status: "Overdue",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/04/01_200428111255-1.jpg",
        },
        {
          title: "Yu-Gi-Oh!",
          chapters: "100",
          score: "6.5",
          status: "Finished",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/06/01-1591166144-rs.jpg",
        },
      ],
      latest: [
        {
          title: "Highschool of The Dead",
          chapters: "37",
          score: "9.5",
          status: "Finished",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/06/4079534-01-1.jpg",
        },
        {
          title: "Shingeki no Kyojin",
          chapters: "200",
          score: "8.5",
          status: "Overdue",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/06/01-3506326-01.jpg",
        },
        {
          title: "Vinland Saga",
          chapters: "280",
          score: "9.5",
          status: "Finished",
          cover:
            "https://mangacovers.com/wp-content/uploads/2020/06/9781612624204-450x675-1.jpg",
        },
      ],
    };
  },
});
</script>
