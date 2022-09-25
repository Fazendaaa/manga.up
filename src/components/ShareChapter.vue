<template>
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
    <v-btn>
      <v-icon>{{ network.icon }}</v-icon>
      <span>{{ network.name }}</span>
    </v-btn>
  </ShareNetwork>
</template>

<script lang="ts">
import { getChapter } from "@/scripts/mangadex";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "ShareChapterComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const chapter = await getChapter(id.value.toLowerCase());
    const title = chapter.attributes.title;

    return {
      sharing: {
        url: `https://manga.up.fazenda.solutions/reader/${id.value.toLowerCase()}`,
        title: `Read '${title}' now!`,
        description: "Read this and many others mangas at Manga.up!",
        quote: "'A new way to enjoy manga!' - Manga Up Creator",
        hashtags: `MangaUp,Manga,${title.replace(" ", "")}`,
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
          icon: "mdi-facebook-messenger",
        },
      ],
    };
  },
});
</script>
