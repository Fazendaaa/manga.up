<template>
  <h3>Share on:</h3>
  <v-btn>
    <ShareNetwork
      network="facebook"
      :title="title"
      :description="description"
      :url="url"
      :hashtags="hashtags"
      flat
      style="text-decoration: none; color: inherit"
    >
      <v-icon>mid-facebook</v-icon>
      <span>Facebook</span>
    </ShareNetwork>
  </v-btn>
  <v-btn>
    <ShareNetwork
      network="twitter"
      :url="url"
      :title="title"
      :description="description"
      :hashtags="hashtags"
      twitter-user="mangaupofficial"
      flat
      style="text-decoration: none; color: inherit"
    >
      <v-icon>mid-twitter</v-icon>
      <span>Twitter</span>
    </ShareNetwork>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga } from "@/scripts/manga";

export default defineComponent({
  name: "SocialMediaComponent",

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
    const title = manga["attributes"]["title"]["en"];

    return {
      title: `Read '${title}' now!`,
      url: `\n\nhttps://manga.up.fazenda.solutions/info/${id.value.toLowerCase()}\n\n\n`,
      description: "Read this and many others mangas at Manga.up!",
      hashtags: `MangaUp,Manga,${title}`,
    };
  },
});
</script>
