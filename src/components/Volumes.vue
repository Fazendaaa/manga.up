<template>
  <h1>Select a volume to read:</h1>
  <br />

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start"> Translation </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open" key="0">
                Select an available idiom to read
              </span>
              <span v-else key="1">
                {{ chosenTranslation }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row no-gutters>
          <v-col>
            <v-select
              v-model="chosenTranslation"
              :items="translations"
              chips
              flat
              solo
            ></v-select>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

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
                    <span v-if="expanded" key="0">Now a chapter:</span>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs, watch } from "vue";
import { getMangaIssues, getManga } from "@/scripts/mangadex";
import { IVolumes } from "@/scripts/manga";

const updateTranslations = async (
  id: string,
  translations?: string[]
): Promise<IVolumes[][]> => {
  const data = await getMangaIssues(id, translations);
  const numberOfColumns = 3;
  let rows: IVolumes[] = [];
  const issues: IVolumes[][] = [];

  for (const [_, item] of Object.entries(data)) {
    rows.push(item);

    if (rows.length === numberOfColumns) {
      issues.push(rows);
      rows = [];
    }
  }

  return issues;
};

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
    const chosenTranslation = ref("");
    let issues: Ref<IVolumes[][]> = ref([]);

    watch(
      chosenTranslation,
      async (current, previous) => {
        issues.value = [];
        issues.value = await updateTranslations(id.value, [current]);
      },
      { deep: true }
    );
    const translations = (await getManga(id.value)).attributes
      .availableTranslatedLanguages;
    issues.value = await updateTranslations(id.value);

    return {
      issues,
      translations,
      chosenTranslation,
    };
  },
});
</script>
