<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel v-for="item in lists" :key="item.name">
      <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
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

          <v-btn to="{ name: 'ReadList' }">
            <v-icon>mdi-share-all</v-icon>
            <span> Share this list </span>
          </v-btn>

          <v-btn to="{ name: 'ReadList' }">
            <v-icon>mdi-tray-arrow-down</v-icon>
            <span> Export this list </span>
          </v-btn>
        </v-expansion-panel-text>
      </div>
      <div v-else>
        <v-expansion-panel-text>
          Empty "<strong>{{ item.name }}</strong
          >", try adding something from the home page or in the search
        </v-expansion-panel-text>
      </div>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { getList, IReadlist } from "@/scripts/lists";
import { defineComponent } from "vue";
import ListResults from "./ListResults.vue";

interface IList {
  name: string;
  items: IReadlist;
}

export default defineComponent({
  name: "CollectionComponent",

  components: {
    ListResults,
  },

  async setup() {
    const lists: IList[] = [
      {
        name: "Readlist",
        items: await getList().catch(() => {
          return {};
        }),
      },
      {
        name: "Recommended by friends",
        items: {},
      },
      {
        name: "Recommended based on your taste",
        items: {},
      },
    ];
    return {
      lists,
    };
  },
});
</script>
