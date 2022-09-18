<template>
  <Intro />
  <Suspense>
    <template #default>
      <LatestComponent :numberOfItems="numberOfItems" />
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
      <RecommendedComponent :numberOfItems="numberOfItems" />
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
      <TrendingComponent :numberOfItems="numberOfItems" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="purple lighten-2"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
  <Suspense>
    <template #default>
      <RandomComponent :numberOfItems="numberOfItems" />
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
  <Stores />
  <Contact />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/Intro.vue";
import Contact from "@/components/Contact.vue";
import Stores from "@/components/Stores.vue";
import LatestComponent from "@/views/Display/LatestDisplay.vue";
import RandomComponent from "@/views/Display/RandomDisplay.vue";
import RecommendedComponent from "@/views/Display/RecommendedDisplay.vue";
import TrendingComponent from "@/views/Display/TrendingDisplay.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Intro,
    Contact,
    Stores,
    LatestComponent,
    RandomComponent,
    RecommendedComponent,
    TrendingComponent,
  },

  setup() {
    return {
      numberOfItems: 3,
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
