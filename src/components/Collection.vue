<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel v-for="(item, index) in lists" :key="index">
      <v-expansion-panel-title>{{ item }}</v-expansion-panel-title>
      <v-expansion-panel-text> </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollectionComponent",

  setup() {
    const lists = [
      "Saved",
      "Recommended by friends",
      "Recommended based on your taste",
    ];

    return {
      lists,
    };
  },
});
</script>
