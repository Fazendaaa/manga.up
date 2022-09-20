<template>
  <h1>Statistics:</h1>
  <div>
    <strong>Follows:</strong>
    {{ statistics.follows }}
  </div>
  <div>
    <strong>Average:</strong>
    {{ statistics.rating.average }}
  </div>
  <div>
    <strong>Bayesian:</strong>
    {{ statistics.rating.bayesian }}
  </div>
  <div>
    <strong>Gaussian:</strong>
    <ag-charts-vue :options="options"></ag-charts-vue>
  </div>
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
    const options = {
      data,
      autoSize: true,
      title: {
        text: "Distribution",
      },
      subtitle: {
        text: "",
      },
      series: [
        {
          type: "line",
          xKey: "index",
          xName: "",
          yKey: "item",
          yName: "",
        },
      ],
    };

    return {
      options,
      statistics,
    };
  },
});
</script>
