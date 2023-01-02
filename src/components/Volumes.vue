<template>
  <v-card>
    <v-card-title :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
      {{ $vuetify.locale.t("info.select") }}:
    </v-card-title>

    <v-card-subtitle :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
      <v-select
        v-model="chosenTranslation"
        :items="translations"
        :label="$vuetify.locale.t('info.idiom')"
        flat
        solo
      />
    </v-card-subtitle>

    <v-card-text :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
      <v-row>
        <v-container
          v-for="(rows, indexA) in issues"
          v-bind:key="indexA"
          class="grey lighten-5 mb-6"
        >
          <v-row align="center" align-content="center" no-gutters dense>
            <v-col v-for="(item, indexB) in rows" v-bind:key="indexB">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                      <v-row align="center" v-if="!expanded">
                        <v-icon v-if="item['read']">mdi-radiobox-marked</v-icon>
                        <v-icon v-else>mdi-radiobox-blank</v-icon>
                        <span>{{ item["volume"] }}</span>
                      </v-row>
                      <v-col cols="8" class="text-grey">
                        <v-fade-transition leave-absolute>
                          <span v-if="expanded" key="0">Now a chapter:</span>
                        </v-fade-transition>
                      </v-col>
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="scroll">
                    <v-card-text>
                      <v-btn
                        v-for="(chapter, indexC) in item['chapters']"
                        v-bind:key="indexC"
                        outlined
                        block
                        :color="chapter['read'] ? 'green' : 'red'"
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
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs, watch } from "vue";
import { getMangaIssues, getManga, IVolumes } from "@/scripts/mangadex";
import { useLocale } from "vuetify/lib/framework.mjs";
import { IReadingHistory, readHistory } from "@/scripts/reading";
import { IChapters } from "@/scripts/types";

export interface IChaptersChecked extends IChapters {
  read: boolean;
}

interface IChaptersAggregateChecked {
  [issue: string]: IChaptersChecked;
}

interface IVolumesChecked {
  read: boolean;
  volume: string;
  count: number;
  chapters: IChaptersAggregateChecked;
}

const checkStatus = (
  history: IReadingHistory,
  volume: IVolumes
): IVolumesChecked => {
  const chapters: IChaptersAggregateChecked = {};
  let volumeRead = true;
  let chapterRead;
  let key: string;
  let item: IChapters;

  for ([key, item] of Object.entries(volume.chapters)) {
    chapterRead = item.id in history;

    if (false === chapterRead) {
      volumeRead = false;
    }

    chapters[key] = {
      read: chapterRead,
      ...item,
    };
  }

  return {
    chapters,
    read: volumeRead,
    count: volume.count,
    volume: volume.volume,
  };
};

const updateTranslations = async (
  id: string,
  missingVolume: string,
  translations: string[]
): Promise<IVolumesChecked[][]> => {
  const data = Object.entries(await getMangaIssues(id, translations));
  const numberOfColumns = 3;
  const issues: IVolumesChecked[][] = [];
  const history = await readHistory(id);
  let index = 0;
  let position = 0;
  let checkedVolume;

  for (const [key, item] of data) {
    checkedVolume = checkStatus(history, item);

    if ("none" !== key) {
      position = Math.floor(index / numberOfColumns);

      if (undefined === issues[position]) {
        issues[position] = [];
      }

      issues[position].push(checkedVolume);
      index += 1;
    } else {
      checkedVolume.volume = missingVolume;
      issues[position] = [checkedVolume];
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
    const translator = useLocale();
    const missingVolume = translator.t("info.missingVolume");
    const chosenTranslation = ref("");
    let issues: Ref<IVolumesChecked[][]> = ref([]);

    watch(
      chosenTranslation,
      async (current, _) => {
        issues.value = [];
        issues.value = await updateTranslations(id.value, missingVolume, [
          current,
        ]);
      },
      { deep: true }
    );
    const translations = (await getManga(id.value)).attributes
      .availableTranslatedLanguages;

    return {
      issues,
      translations,
      chosenTranslation,
    };
  },
});
</script>
<style lang="scss" scoped>
.center {
  margin: 0;
  position: relative;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
