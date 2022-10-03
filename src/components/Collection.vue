<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel v-for="item in lists" :key="item.name">
      <v-expansion-panel-title>
        <v-icon>{{
          $vuetify.locale.getScope().t(`favorites.items.${item.name}.icon`)
        }}</v-icon>
        <span>
          {{
            $vuetify.locale.getScope().t(`favorites.items.${item.name}.name`)
          }}
        </span>
      </v-expansion-panel-title>
      <div v-if="0 !== Object.keys(item.items).length">
        <v-expansion-panel-text>
          <Suspense>
            <template #default>
              <ListResults :ids="Object.keys(item.items)" />
            </template>
            <template #fallback>
              <v-progress-linear
                color="lime"
                indeterminate
                reverse
              ></v-progress-linear
            ></template>
          </Suspense>

          <v-btn :to="{ name: 'Share', params: { name: item.name } }">
            <v-icon>mdi-share-all</v-icon>
            <span> {{ $vuetify.locale.getScope().t("favorites.share") }} </span>
          </v-btn>

          <v-btn @click="exportList(item)">
            <v-icon>mdi-tray-arrow-down</v-icon>
            <span>
              {{ $vuetify.locale.getScope().t("favorites.export") }}
            </span>
          </v-btn>

          <v-btn :to="{ name: 'List', params: { name: item.name } }">
            <v-icon>mdi-format-list-checks</v-icon>
            <span>
              {{ $vuetify.locale.getScope().t("favorites.seeAll") }}
            </span>
          </v-btn>
        </v-expansion-panel-text>
      </div>
      <div v-else>
        <v-expansion-panel-text>
          {{ $vuetify.locale.getScope().t("favorites.missing") }}
        </v-expansion-panel-text>
      </div>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { getList, IReadlist } from "@/scripts/lists";
import { defineComponent } from "vue";
import download from "downloadjs";
import ListResults from "./ListResults.vue";

interface IList {
  name: string;
  items: IReadlist;
}

const exportList = (list: IList) =>
  download(JSON.stringify(list), `${list.name}.json`, "text/plain");

export default defineComponent({
  name: "CollectionComponent",

  components: {
    ListResults,
  },

  async setup() {
    const lists: IList[] = [
      {
        name: "readlist",
        items: await getList().catch(() => {
          return {};
        }),
      },
      {
        name: "recommended",
        items: {},
      },
      {
        name: "taste",
        items: {},
      },
    ];

    return {
      lists,
      exportList,
    };
  },
});
</script>
