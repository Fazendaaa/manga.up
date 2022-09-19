<template>
  <v-container
    v-for="rows in issues"
    v-bind:key="rows"
    class="grey lighten-5 mb-6"
  >
    <v-row align="center" align-content="center" no-gutters dense>
      <v-col v-for="item in rows" :key="item">
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ props }">
            <v-btn outlined block v-bind="props" align="center">
              {{ item["volume"] }}
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar color="primary">
                Volume: {{ item["volume"] }}
              </v-toolbar>
              Chapters:
              <v-card-text>
                <v-btn
                  v-for="chapter in item['chapters']"
                  :key="chapter"
                  class="text-h2 pa-12"
                >
                  {{ chapter["chapter"] }}
                </v-btn>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="isActive.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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

    console.log(issues);

    return {
      issues,
    };
  },

  methods: {
    ping: (data: unknown) => console.log(data),
  },
});
</script>
