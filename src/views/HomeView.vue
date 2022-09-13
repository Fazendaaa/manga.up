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
            "https://mangadex.org/covers/239d6260-d71f-43b0-afff-074e3619e3de/3ccca6eb-e108-4d02-b452-49506797711d.jpg",
        },
        {
          title: "Berserk",
          chapters: "357",
          score: "9.5",
          status: "complete",
          cover:
            "https://mangadex.org/covers/801513ba-a712-498c-8f57-cae55b38cc92/2a61abcb-8e6e-460d-8551-1caa93e09e39.jpg",
        },
        {
          title: "One Piece",
          chapters: "1010",
          score: "9",
          status: "overdue",
          cover:
            "https://mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/0f6532c5-4ac4-4129-a418-2767a45804ef.jpg",
        },
      ],
      trending: [
        {
          title: "Naruto",
          chapters: "700",
          score: "5",
          status: "Finished",
          cover:
            "https://mangadex.org/covers/6b1eb93e-473a-4ab3-9922-1a66d2a29a4a/bb223226-a5ca-457b-8a10-ad3ecaea66be.jpg",
        },
        {
          title: "HunterXHunter",
          chapters: "200",
          score: "8.5",
          status: "Overdue",
          cover:
            "https://mangadex.org/covers/db692d58-4b13-4174-ae8c-30c515c0689c/f9dcc8ec-2921-4088-aa95-d8ecfe85c37e.jpg",
        },
        {
          title: "Yu-Gi-Oh!",
          chapters: "100",
          score: "6.5",
          status: "Finished",
          cover:
            "https://mangadex.org/covers/edaae213-67c7-4a6c-ad5f-141001891741/9064ab4f-ce36-4f37-9c36-a725d631fc40.jpg",
        },
      ],
      latest: [
        {
          title: "Highschool of The Dead",
          chapters: "37",
          score: "9.5",
          status: "Finished",
          cover:
            "https://mangadex.org/covers/9fd3284e-2b60-4e39-adff-31763d2892f1/8c0dd009-2461-49c9-a939-675194b213ef.jpg",
        },
        {
          title: "Shingeki no Kyojin",
          chapters: "200",
          score: "8.5",
          status: "Overdue",
          cover:
            "https://mangadex.org/covers/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/12158456-0511-468b-be37-8d2aa3772723.png",
        },
        {
          title: "Vinland Saga",
          chapters: "280",
          score: "9.5",
          status: "Finished",
          cover:
            "https://mangadex.org/covers/5d1fc77e-706a-4fc5-bea8-486c9be0145d/af345d2b-42c6-4c65-8a81-922086255795.jpg",
        },
      ],
    };
  },
});
</script>
