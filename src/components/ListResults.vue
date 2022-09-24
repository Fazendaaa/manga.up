<template>
  <v-card
    v-for="item in entries"
    v-bind:key="item.id"
    max-width="400"
    class="mx-auto"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <router-link
              flat
              style="text-decoration: none; color: inherit"
              :to="{ name: 'Info', params: { id: item.id } }"
            >
              <v-card-title class="text-h5" style="max-width: 250px">
                <MarqueeText :duration="30">
                  {{ item.attributes.title.en }}
                </MarqueeText>
              </v-card-title>
            </router-link>

            <v-card-subtitle>
              {{ item.attributes.availableTranslatedLanguages.join(", ") }}
            </v-card-subtitle>

            <v-card-actions>
              <RemoveFromFavorites :id="item.id" />

              <v-spacer></v-spacer>
            </v-card-actions>
          </div>

          <router-link
            flat
            style="text-decoration: none; color: inherit"
            :to="{ name: 'Info', params: { id: item.id } }"
          >
            <v-avatar class="ma-3" position="right" size="125" rounded="0">
              <v-img :src="item.cover" />
            </v-avatar>
          </router-link>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script lang="ts">
import { IManga, getManga, searchMangaCoverPreview } from "@/scripts/mangadex";
import MarqueeText from "vue-marquee-text-component";
import { defineComponent, ref, toRefs } from "vue";
import RemoveFromFavorites from "./RemoveFromFavorites.vue";

interface IShow {
  [id: string]: boolean;
}

interface IListManga extends IManga {
  cover?: string;
}

const fetchCover = async (ids: string[]): Promise<IListManga[]> => {
  const result = await Promise.all(ids.map((id) => getManga(id)));

  return await Promise.all(
    result.map(async (item) => {
      return {
        ...item,
        cover: await searchMangaCoverPreview(
          item.id,
          item.relationships.filter(
            (relation) => "cover_art" === relation.type
          )[0].id
        ),
      };
    })
  );
};

export default defineComponent({
  name: "ListResultsComponents",

  props: {
    ids: {
      type: Array as () => Array<string>,
      required: true,
      default: () => [],
    },
  },

  components: {
    RemoveFromFavorites,
    MarqueeText,
  },

  async setup(props) {
    const { ids } = toRefs(props);
    const show = ref<IShow>({});

    return {
      show,
      entries: await fetchCover(ids.value),
    };
  },
});
</script>
