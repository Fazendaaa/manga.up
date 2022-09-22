<template>
  <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
    <v-btn
      v-if="'0' !== chapter.previous.id"
      variant="outlined"
      :to="{ name: 'Reader', force: true, params: { id: chapter.previous.id } }"
    >
      <v-icon>mdi-skip-previous</v-icon>
      <span>Previous Chapter</span>
    </v-btn>
    <v-btn
      v-if="'0' !== chapter.next.id"
      variant="outlined"
      :to="{ name: 'Reader', force: true, params: { id: chapter.next.id } }"
    >
      <v-icon>mdi-skip-next</v-icon>
      <span>Next Chapter</span>
    </v-btn>
  </div>
  <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
    <v-btn
      v-if="'0' !== volume.previous.id"
      variant="outlined"
      :to="{ name: 'Reader', force: true, params: { id: volume.previous.id } }"
    >
      <v-icon>mdi-skip-backward</v-icon>
      <span>Previous Volume</span>
    </v-btn>
    <v-btn :to="{ name: 'Info', params: { id: mangaID } }">
      <v-icon>mdi-book</v-icon>
      <span>Back to Manga</span>
    </v-btn>
    <v-btn
      v-if="'0' !== volume.next.id"
      variant="outlined"
      :to="{ name: 'Reader', force: true, params: { id: volume.next.id } }"
    >
      <v-icon>mdi-skip-forward</v-icon>
      <span>Next Volume</span>
    </v-btn>
  </div>

  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>About upload:</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-btn target="_blank" :href="scanGroupURL">
          <v-icon>mdi-account-group</v-icon>
          <span>Scan group</span>
        </v-btn>
        <v-btn target="_blank" :href="scanUserURL">
          <v-icon>mdi-account-heart-outline</v-icon>
          <span>Scan user</span>
        </v-btn>
        <div>
          <div>Volume: {{ volume.current.number }}</div>
          <div>
            Chapter: {{ chapter.number }}
            <strong v-if="'' != chapter.title">- {{ chapter.title }}</strong>
          </div>
          <div>Upload Version: {{ version }}</div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getChapter, getMangaIssues, relativeIssues } from "@/scripts/mangadex";

export default defineComponent({
  name: "ReaderNavigationComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const data = await getChapter(id.value);
    const version =
      undefined !== data.attributes.version ? data.attributes.version : "?";
    const chapterNumber =
      undefined !== data.attributes.chapter ? data.attributes.chapter : "?";
    const chapterTitle =
      undefined !== data.attributes.title ? data.attributes.title : "?";
    const translatedLanguage = data.attributes.translatedLanguage;
    let mangaID = "";
    let scanUserURL = "";
    let scanGroupURL = "";

    data.relationships.forEach((item) => {
      if ("manga" === item.type) {
        mangaID = item.id;
      }
      if ("user" === item.type) {
        scanUserURL = `https://mangadex.org/user/${item.id}`;
      }
      if ("scanlation_group" === item.type) {
        scanGroupURL = `https://mangadex.org/group/${item.id}`;
      }
    });

    const issues = relativeIssues(
      id.value.toLowerCase(),
      await getMangaIssues(mangaID, [translatedLanguage])
    );

    return {
      version,
      mangaID,
      scanUserURL,
      scanGroupURL,
      volume: issues.volume,
      chapter: {
        title: chapterTitle,
        number: chapterNumber,
        ...issues.chapter,
      },
    };
  },
});
</script>
