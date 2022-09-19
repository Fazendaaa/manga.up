<template>
  <v-container
    v-for="rows in issues"
    v-bind:key="rows"
    class="grey lighten-5 mb-6"
  >
    <v-row align="center" align-content="center" no-gutters dense>
      <v-col v-for="item in rows" :key="item">
        <v-card class="pa-2" align="center" outlined tile>
          {{ item["volume"] }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getMangaIssues } from "@/scripts/mangadex";
import { IChapter } from "@/scripts/manga";

export default defineComponent({
  name: "VolumesComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getMangaIssues(id.value);
    const numberOfColumns = 3;
    let issues: IChapter[][] = [];
    let rows: IChapter[] = [];

    for (const [_, item] of Object.entries(data)) {
      rows.push(item);

      if (rows.length === numberOfColumns) {
        issues.push(rows);
        rows = [];
      }
    }

    return {
      issues,
    };
  },
});
</script>
