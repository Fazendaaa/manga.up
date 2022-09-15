<template>
  <Intro />
  <Suspense>
    <template #default>
      <Display header="Latest" :ids="latest" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="blue-grey"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
  <Suspense>
    <template #default>
      <Display header="Trending" :ids="trending" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="deep-orange lighten-2"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
  <Suspense>
    <template #default>
      <Display header="Recommended" :ids="recommendations" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="lime"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
  <br />
  <Stores />
  <Contact />
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
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 200px;
  position: relative;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
