<template>
  <h1>Select a volume to read:</h1>

  <v-container
    v-for="rows in issues"
    v-bind:key="rows"
    class="grey lighten-5 mb-6"
  >
    <v-row align="center" align-content="center" no-gutters dense>
      <v-col v-for="item in rows" :key="item">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <template v-slot:default="{ expanded }">
                <v-row no-gutters v-if="!expanded">
                  {{ item["volume"] }}
                </v-row>
                <v-col cols="8" class="text-grey">
                  <v-fade-transition leave-absolute>
                    <span v-if="expanded" key="0"> Now a chapter: </span>
                  </v-fade-transition>
                </v-col>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card-text>
                <v-btn
                  v-for="chapter in item['chapters']"
                  :key="chapter"
                  outlined
                  block
                  :to="{ name: 'Reader', params: { id: chapter['id'] } }"
                >
                  {{ chapter["chapter"] }}
                </v-btn>
              </v-card-text>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- <v-card>
            <v-toolbar> Volume: {{ item["volume"] }} </v-toolbar>
            <v-divider></v-divider>
            Chapters:
            <v-card-text>
              <v-btn
                v-for="chapter in item['chapters']"
                :key="chapter"
                outlined
                block
                :to="{ name: 'Reader', params: { id: chapter['id'] } }"
              >
                {{ chapter["chapter"] }}
              </v-btn>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog[item['volume']] = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getMangaIssues } from "@/scripts/mangadex";
import { IVolumes } from "@/scripts/manga";

export default defineComponent({
  name: "VolumesComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  data: () => ({
    date: null,
    trip: {
      name: "",
      location: null,
      start: null,
      end: null,
    },
    locations: [
      "Australia",
      "Barbados",
      "Chile",
      "Denmark",
      "Ecuador",
      "France",
    ],
  }),

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getMangaIssues(id.value);
    const numberOfColumns = 3;
    let issues: IVolumes[][] = [];
    let rows: IVolumes[] = [];

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
