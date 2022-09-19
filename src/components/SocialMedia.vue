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

export default defineComponent({
  name: "SocialMediaComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup(props) {
    const { id, name } = toRefs(props);

    return {
      title: `Read '${name.value}' now!`,
      url: `https://manga.up.fazenda.solutions/info/${id.value}`,
      description: "Read this and many others mangas at Manga.up!",
      hashtags: `MangaUp,Manga,${name.value}`,
    };
  },
});
</script>
