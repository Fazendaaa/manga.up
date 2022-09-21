<template>
  <v-icon v-if="response">mdi-access-point-check</v-icon>
  <v-icon v-else>mdi-access-point-off</v-icon>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { status } from "@/scripts/mangadex";

export default defineComponent({
  name: "StatusComponent",

  async setup() {
    const response = ref(true);

    response.value = await status();

    return {
      response,
    };
  },
});
</script>
