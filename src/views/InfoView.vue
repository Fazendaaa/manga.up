<template>
  <div>
    <Suspense>
      <template #default>
        <Info :id="id" />
      </template>
      <template #fallback>
        <h1>Loading Info...</h1>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <Chapters :id="id" />
      </template>
      <template #fallback>
        <h1>Loading Chapters...</h1>
      </template>
    </Suspense>
    <v-btn :to="{ name: 'Reader' }">
      <v-icon>mid-book-arrow-left-outline</v-icon>
      <span>Read</span>
    </v-btn>
    <!-- Sources -->
    <!-- Where to buy -->
    <!-- MAL -->
    <!-- ANILIST -->
    <!-- NetFlix -->
    <!-- Amazon Prime -->
    <!-- Crunchyroll -->
    <!-- etc -->
    <SocialMedia />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Info from "@/components/Info.vue";
import Chapters from "@/components/Chapters.vue";
import SocialMedia from "@/components/SocialMedia.vue";

export default defineComponent({
  name: "InfoView",

  components: {
    Info,
    Chapters,
    SocialMedia,
  },

  setup() {
    const route = useRoute();
    const id = computed(() => {
      if (undefined !== route.params.id) {
        const id =
          "string" == typeof route.params.id
            ? route.params.id
            : route.params.id[0];

        return id.toUpperCase();
      } else {
        return "";
      }
    });

    return {
      id,
    };
  },
});
</script>
