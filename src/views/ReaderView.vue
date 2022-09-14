<template>
  <p>Manga: {{ id }}</p>
  <div class>
    <Reader />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Reader from "@/components/Reader.vue";

export default defineComponent({
  name: "ReaderView",

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

  components: {
    Reader,
  },
});
</script>
