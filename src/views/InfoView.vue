<template>
  <HeaderInfo :id="id" />
  <v-card>
    <v-toolbar>
      <v-tabs v-model="tab" dark background-color="primary" grow>
        <v-tab value="details">
          {{ $vuetify.locale.getScope().t("info.details") }}
        </v-tab>
        <v-tab value="volumes">
          {{ $vuetify.locale.getScope().t("info.volumes") }}
        </v-tab>
        <v-tab value="others">
          {{ $vuetify.locale.getScope().t("info.others") }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="details">
          <DetailsInfo :id="id" />
        </v-window-item>
        <v-window-item value="volumes">
          <VolumesInfo :id="id" />
        </v-window-item>
        <v-window-item value="others">
          <OthersInfo :id="id" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <SocialMediaInfo :id="id" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import HeaderInfo from "@/views/Info/HeaderInfo.vue";
import DetailsInfo from "@/views/Info/DetailsInfo.vue";
import VolumesInfo from "@/views/Info/VolumesInfo.vue";
import OthersInfo from "@/views/Info/OthersInfo.vue";
import SocialMediaInfo from "@/views/Info/SocialMediaInfo.vue";

export default defineComponent({
  name: "InfoView",

  components: {
    OthersInfo,
    HeaderInfo,
    DetailsInfo,
    VolumesInfo,
    SocialMediaInfo,
  },

  data: () => ({
    tab: null,
  }),

  setup() {
    const route = useRoute();
    const id = computed(() => {
      if (undefined !== route.params.id) {
        const id =
          "string" == typeof route.params.id
            ? route.params.id
            : route.params.id[0];

        return id.toUpperCase();
      } else {
        return "";
      }
    });

    return {
      id,
    };
  },
});
</script>
