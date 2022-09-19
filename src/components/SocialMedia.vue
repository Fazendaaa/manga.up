<template>
  <br />
  <v-btn>
    <ShareNetwork
      network="facebook"
      url="https://manga.up.fazenda.solutions/info/"
      title="Awesome Article"
      description="This is an awesome article for awesome readers"
      hashtags="MangaUp, Manga"
      flat
      style="text-decoration: none; color: inherit"
    >
      <v-icon>mid-facebook</v-icon>
      <span>Share on Facebook</span>
    </ShareNetwork>
  </v-btn>
  <v-btn>
    <ShareNetwork
      network="twitter"
      url="https://manga.up.fazenda.solutions/info/"
      title="Another Awesome Article"
      description="This is another awesome article for awesome readers"
      hashtags="MangaUp, Manga"
      twitter-user="mangaupofficial"
      flat
      style="text-decoration: none; color: inherit"
    >
      <v-icon>mid-twitter</v-icon>
      <span>Share on Twitter</span>
    </ShareNetwork>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface SocialShare {
  link: string;
  title: string;
  description: string;
}

export default defineComponent({
  name: "SocialMediaComponent",

  props: {
    link: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup() {
    return;
  },
});
</script>
