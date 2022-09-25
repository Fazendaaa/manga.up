<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-text>
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
      </v-col>
      <v-col>
        <v-img :src="src" cover />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga, searchMangaCoverPreview } from "@/scripts/mangadex";
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
    const cover = manga["relationships"].filter(
      (relationship) => "cover_art" === relationship.type
    )[0];
    const src = await searchMangaCoverPreview(manga["id"], cover["id"]);

    return {
      src,
      manga,
    };
  },
});
</script>
