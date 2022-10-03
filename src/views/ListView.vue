<template>{{ name }}</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ListView",

  setup() {
    const route = useRoute();
    const name = computed(() => {
      if (undefined !== route.params.name) {
        const name =
          "string" == typeof route.params.name
            ? route.params.name
            : route.params.name[0];

        return name.toUpperCase();
      } else {
        return "";
      }
    });

    return {
      name,
    };
  },
});
</script>
