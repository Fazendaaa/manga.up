<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>Statistics:</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-container :class="{ 'ma-0 pa-0': $vuetify.display.xs }">
          <div>
            <strong>Follows:</strong>
            {{ follows }}
          </div>
          <div>
            <strong>Average:</strong>
            {{ average }}
          </div>
          <div>
            <strong>Bayesian:</strong>
            {{ bayesian }}
          </div>
          <ag-charts-vue :options="gaussian"></ag-charts-vue>
          <!-- <ag-charts-vue :options="average"></ag-charts-vue>
          <ag-charts-vue :options="bayesian"></ag-charts-vue> -->
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { getMangaStatistics } from "@/scripts/mangadex";
import { defineComponent, toRefs } from "vue";
import { AgChartsVue } from "ag-charts-vue3";

export default defineComponent({
  name: "StatisticsComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  components: {
    AgChartsVue,
  },

  async setup(props) {
    const { id } = toRefs(props);
    const statistics = (await getMangaStatistics(id.value))[
      id.value.toLowerCase()
    ];
    const distribution = statistics.rating.distribution;
    const data = Object.keys(distribution).map((key, _) => {
      return {
        index: key,
        item: distribution[key],
      };
    });
    const theme = "ag-material-dark";
    const gaussian = {
      data,
      theme,
      title: {
        text: "Distribution",
      },
      subtitle: {
        text: "Of the scores given by users",
      },
      series: [
        {
          type: "line",
          xKey: "index",
          xName: "Score",
          yKey: "item",
          yName: "Number of people",
        },
      ],
    };
    const average = {
      data: [
        {
          quarter: "Q1'18",
          iphone: 140,
          mac: 16,
          ipad: 14,
          wearables: 12,
          services: 20,
        },
        // {
        //   average: statistics.rating.average,
        // },
      ],
      theme,
      title: {
        text: "Average",
      },
      subtitle: {
        text: "Of the scores given by users",
      },
      series: [
        {
          type: "column",
          xKey: "quarter",
          yKey: "iphone",
        },
      ],
    };
    const bayesian = {
      data: statistics.rating.bayesian,
      theme,
      title: {
        text: "Distribution",
      },
      subtitle: {
        text: "Of the scores given by users",
      },
      series: [
        {
          type: "line",
          xKey: "index",
          xName: "Score",
          yKey: "item",
          yName: "Number of people",
        },
      ],
    };

    return {
      gaussian,
      follows: statistics.follows,
      average: statistics.rating.average,
      bayesian: statistics.rating.bayesian,
    };
  },
});
</script>
