<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts">
import { getManga } from "@/scripts/manga";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "HeaderComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const manga = await getManga(id.value);

    return {
      title: manga["attributes"]["title"]["en"],
    };
  },
});
</script>
