<template>
  <h2>Year: {{ manga["attributes"]["year"] }}</h2>
  <h2>Rating: {{ manga["attributes"]["contentRating"] }}</h2>
  <h2>Tags: {{ manga["attributes"]["contentRating"] }}</h2>
  <h2>Status: {{ manga["attributes"]["status"] }}</h2>
  <h2>Description</h2>
  <Markdown :source="manga['attributes']['description']['en']" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga } from "@/scripts/mangadex";
import Markdown from "vue3-markdown-it";

export default defineComponent({
  name: "InfoComponent",

  components: {
    Markdown,
  },

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
