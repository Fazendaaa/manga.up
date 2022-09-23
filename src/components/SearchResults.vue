<template>
  <v-card
    v-for="item in entries"
    v-bind:key="item.id"
    class="mx-auto"
    max-width="344"
  >
    <v-img :src="item.cover" height="200px" cover></v-img>

    <v-card-title> {{ item.attributes.title.en }} </v-card-title>

    <v-card-subtitle>
      {{ item.attributes.availableTranslatedLanguages.join(", ") }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        :to="{ name: 'Info', params: { id: item.id } }"
      >
        More about it
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show[item.id] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show[item.id] = !show[item.id]"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show[item.id]">
        <v-divider></v-divider>

        <v-card-text>
          {{ item.attributes.description.en }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import {
  IManga,
  searchManga,
  searchMangaCoverPreview,
} from "@/scripts/mangadex";
import { defineComponent, ref, toRefs, watch } from "vue";

interface IShow {
  [id: string]: boolean;
}

interface ISearchManga extends IManga {
  cover?: string;
}

const updateSearch = async (
  newSearch: string,
  maxResult: string,
  page: number
) => {
  const offset = (Number(maxResult) * (page - 1)).toString();
  const result = await searchManga(newSearch, maxResult, offset);

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
  name: "SearchResultsComponents",

  props: {
    search: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup(props) {
    const { search } = toRefs(props);
    const entries = ref<ISearchManga[]>([]);
    const show = ref<IShow>({});
    const page = ref(1);
    const length = ref(5);
    const maxResult = "5";

    watch(search, async (newSearch) => {
      entries.value = [];
      entries.value = await updateSearch(newSearch, maxResult, page.value);
    });
    watch(page, async (newPage) => {
      entries.value = [];
      entries.value = await updateSearch(search.value, maxResult, newPage);

      if (0 !== entries.value.length) {
        length.value = length.value + 1;
      }
    });

    return {
      show,
      page,
      length,
      entries,
    };
  },
});
</script>
