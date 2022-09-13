<template>
  <div>
    <p>Manga Info</p>
    <Info :id="id" />
    <!-- Sources -->
    <!-- Where to buy -->
    <!-- MAL -->
    <!-- ANILIST -->
    <!-- NetFlix -->
    <!-- Amazon Prime -->
    <!-- Crunchyroll -->
    <!-- etc -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Info from "@/components/Info.vue";

export default defineComponent({
  name: "InfoView",
  components: {
    Info,
  },
  setup() {
    const route = useRoute();
    const id = computed(() => {
      const id =
        "string" == typeof route.params.id
          ? route.params.id
          : route.params.id[0];

      return id.toUpperCase();
    });

    return { id };
  },
});
</script>
