<template>
  <h3>Share on:</h3>
  <v-btn>
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
      flat
      style="text-decoration: none; color: inherit"
    >
      <v-icon>{{ network.icon }}</v-icon>
      <span>{{ network.name }}</span>
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
      sharing: {
        url: `https://manga.up.fazenda.solutions/info/${id.value.toLowerCase()}`,
        title: `Read '${title}' now!`,
        description: "Read this and many others mangas at Manga.up!",
        quote: "'A new way to enjoy manga!' - Manga Up Creator",
        hashtags: `MangaUp,Manga,${title}`,
        twitterUser: "mangaupofficial",
      },
      networks: [
        {
          network: "twitter",
          name: "Twitter",
          icon: "mdi-twitter",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "mdi-whatsapp",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "mdi-telegram",
        },
        {
          network: "messenger",
          name: "Messenger",
          icon: "mdi-messenger",
        },
      ],
    };
  },
});
</script>
