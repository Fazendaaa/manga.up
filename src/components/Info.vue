<template>
  <v-card>
    <v-img class="hidden-sm-and-up" max-height="230" :src="src" cover />
    <v-row>
      <v-col :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
        <v-card-text max-width="500">
          <strong>{{ $vuetify.locale.t("info.rating") }}: </strong>
          {{ manga["attributes"]["contentRating"] }}
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.t("info.status") }}: </strong>
          {{ manga["attributes"]["status"] }}
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.t("info.tags") }}: </strong>
          <span
            v-for="(tag, index) in manga['attributes']['tags']"
            v-bind:key="index"
          >
            {{ tag["attributes"]["name"]["en"] }},
          </span>
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.t("info.year") }}: </strong>
          {{ manga["attributes"]["year"] }}
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.t("info.description") }}: </strong>
          <Markdown
            :source="
              manga['attributes']['description']['en'].slice(0, limitCharacters)
            "
          />
          <v-btn
            variant="outlined"
            size="x-small"
            class="ma-0 pa-0 d-flex"
            @click="showingFullText = !showingFullText"
          >
            Read {{ showingFullText ? "Less" : "More" }}
          </v-btn>
        </v-card-text>

        <Favorites :id="id" />
      </v-col>
      <v-col class="hidden-xs" align="right">
        <v-img :src="src" max-width="300" cover />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { getManga, searchMangaCoverPreview } from "@/scripts/mangadex";
import Markdown from "vue3-markdown-it";
import Favorites from "./Favorites.vue";

export default defineComponent({
  name: "InfoComponent",

  components: {
    Markdown,
    Favorites,
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
    const showingFullText = ref(false);
    const maxCharacters = 200;
    const limitCharacters = ref<number | undefined>(maxCharacters);

    watch(showingFullText, (show) => {
      limitCharacters.value = show ? undefined : maxCharacters;
    });

    const manga = await getManga(id.value);
    const cover = manga["relationships"].filter(
      (relationship) => "cover_art" === relationship.type
    )[0];
    const src = await searchMangaCoverPreview(manga["id"], cover["id"]);

    return {
      src,
      manga,
      showingFullText,
      limitCharacters,
    };
  },
});
</script>
