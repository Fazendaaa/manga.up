<template>
  <h1>{{ manga["attributes"]["title"]["en"] }}</h1>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga } from "@/scripts/mangadex";

export default defineComponent({
  name: "InfoComponent",

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
      manga,
    };
  },
});
</script>
