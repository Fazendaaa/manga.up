<template>
  <v-card>
    <v-card-title>
      {{ $vuetify.locale.getScope().t("info.sources") }}:
    </v-card-title>
    <v-card-text>
      <div align="center">
        <v-btn
          v-for="link in links"
          :key="link.name"
          :href="link.value"
          target="_blank"
        >
          <v-icon>{{ link.name }}</v-icon>
          <span>{{ link.name }}</span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getManga, ILinks } from "@/scripts/mangadex";

export default defineComponent({
  name: "OthersComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { id } = toRefs(props);
    const sources = (await getManga(id.value)).attributes.links;
    const links = Object.keys(sources).map((link) => {
      return {
        name: link,
        value: sources[link as keyof ILinks],
      };
    });

    return {
      links,
    };
  },
});
</script>
