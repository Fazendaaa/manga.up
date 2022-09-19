<template>
  <v-container
    v-for="rows in issues"
    v-bind:key="rows"
    class="grey lighten-5 mb-6"
  >
    <v-row align="center" align-content="center" no-gutters dense>
      <v-col v-for="item in rows" :key="item">
        <v-btn outlined block @click="dialog[item['volume']] = true">
          {{ item["volume"] }}
        </v-btn>
        <v-dialog
          v-model="dialog[item['volume']]"
          transition="dialog-top-transition"
          max-width="600"
        >
          <v-card>
            <v-toolbar> Volume: {{ item["volume"] }} </v-toolbar>
            Chapters:
            <v-card-text>
              <v-btn
                v-for="chapter in item['chapters']"
                :key="chapter"
                outlined
                block
              >
                {{ chapter["chapter"] }}
              </v-btn>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog[item['volume']] = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getMangaIssues } from "@/scripts/mangadex";
import { IVolumes } from "@/scripts/manga";

interface Dialog {
  [id: string]: boolean;
}

export default defineComponent({
  name: "VolumesComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  data() {
    return {
      dialog: {} as Dialog,
    };
  },

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
