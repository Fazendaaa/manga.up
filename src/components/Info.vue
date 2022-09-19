<template>
  <div>
    <strong>Year: </strong>
    {{ manga["attributes"]["year"] }}
  </div>
  <div>
    <strong>Rating: </strong>
    {{ manga["attributes"]["contentRating"] }}
  </div>
  <div>
    <strong>Status: </strong>
    {{ manga["attributes"]["status"] }}
  </div>
  <div>
    <strong>Tags: </strong>
    <span v-for="tag in manga['attributes']['tags']" v-bind:key="tag">
      {{ tag["attributes"]["name"]["en"] }},
    </span>
  </div>
  <div>
    <strong>Description: </strong>
    <Markdown :source="manga['attributes']['description']['en']" />
  </div>
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
