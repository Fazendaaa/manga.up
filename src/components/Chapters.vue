<template>
  <p>{{ id }}: Chapters</p>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getMangaIssues } from "@/scripts/mangadex";

export default defineComponent({
  name: "ChaptersComponent",
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const issues = await getMangaIssues(id.value);
    console.log(issues);

    return {
      issues,
    };
  },
});
</script>
