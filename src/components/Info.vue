<template>
  <v-card>
    <v-img class="hidden-lg-and-up" max-height="230" :src="src" cover />
    <v-row>
      <v-col :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
        <v-card-text max-width="500">
          <strong>{{ $vuetify.locale.getScope().t("info.rating") }}: </strong>
          {{ manga["attributes"]["contentRating"] }}
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.getScope().t("info.status") }}: </strong>
          {{ manga["attributes"]["status"] }}
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.getScope().t("info.tags") }}: </strong>
          <span
            v-for="(tag, index) in manga['attributes']['tags']"
            v-bind:key="index"
          >
            {{ tag["attributes"]["name"]["en"] }},
          </span>
          <v-divider class="mx-4 mb-1" />
          <strong>{{ $vuetify.locale.getScope().t("info.year") }}: </strong>
          {{ manga["attributes"]["year"] }}
          <v-divider class="mx-4 mb-1" />
          <strong
            >{{ $vuetify.locale.getScope().t("info.description") }}:
          </strong>
          <Markdown :source="manga['attributes']['description']['en']" />
        </v-card-text>

        <AddToFavorites v-if="added" :id="id" />
        <RemoveFromFavorites v-else :id="id" />
      </v-col>
      <v-col class="hidden-xs" align="right">
        <v-img :src="src" max-width="300" cover />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { getManga, searchMangaCoverPreview } from "@/scripts/mangadex";
import Markdown from "vue3-markdown-it";
import AddToFavorites from "./AddToFavorites.vue";
import RemoveFromFavorites from "./RemoveFromFavorites.vue";

export default defineComponent({
  name: "InfoComponent",

  components: {
    Markdown,
    AddToFavorites,
    RemoveFromFavorites,
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
    const cover = manga["relationships"].filter(
      (relationship) => "cover_art" === relationship.type
    )[0];
    const src = await searchMangaCoverPreview(manga["id"], cover["id"]);
    const added = ref(false);

    return {
      src,
      added,
      manga,
    };
  },
});
</script>
