<template>
  <div class="home">
    <Intro />
    <Suspense>
      <template #default>
        <Display header="Latest" :ids="latest" />
      </template>
      <template #fallback>
        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </template>
    </Suspense>
    <br />
    <Suspense>
      <template #default>
        <Display header="Trending" :ids="trending" />
      </template>
      <template #fallback>
        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </template>
    </Suspense>
    <br />
    <Suspense>
      <template #default>
        <Display header="Recommended" :ids="recommendations" />
      </template>
      <template #fallback>
        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </template>
    </Suspense>
    <br />
    <Stores />
    <Contact />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/Intro.vue";
import Contact from "@/components/Contact.vue";
import Display from "@/components/Display.vue";
import Stores from "@/components/Stores.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Contact,
    Display,
    Stores,
  },

  setup() {
    return {
      recommendations: ["Bleach", "Berserk", "One Piece"],
      trending: ["Naruto", "HunterXHunter", "One Piece"],
      latest: ["Highschool of The Dead", "Shingeki no Kyojin", "Vinland Saga"],
      isLoading: true,
      fullPage: false,
      loader: "spinner",
      color: "#007bff",
      bgColor: "#ffffff",
      height: 128,
      width: 128,
      timeout: 3000, //ms
    };
  },

  onCancel() {
    console.log("User cancelled the loader.");
  },
});
</script>
