<template>
  <Header :id="id" />
  <v-card>
    <v-toolbar>
      <v-tabs v-model="tab" dark background-color="primary" grow>
        <v-tab value="details"> Details </v-tab>
        <v-tab value="volumes"> Volumes </v-tab>
        <v-tab value="others"> Others </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="details">
          <Details :id="id" />
        </v-window-item>
        <v-window-item value="volumes">
          <Volumes :id="id" />
        </v-window-item>
        <v-window-item value="others">
          <Others :id="id" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <SocialMedia :id="id" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import SocialMedia from "@/components/SocialMedia.vue";
import Header from "@/views/Info/HeaderInfo.vue";
import Details from "@/views/Info/DetailsInfo.vue";
import Volumes from "@/views/Info/VolumesInfo.vue";
import Others from "@/views/Info/OthersInfo.vue";

export default defineComponent({
  name: "InfoView",

  components: {
    SocialMedia,
    Header,
    Details,
    Volumes,
    Others,
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
