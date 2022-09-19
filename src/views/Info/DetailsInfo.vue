<template>
  <Suspense>
    <template #default>
      <Info :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Info...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Info from "@/components/Info.vue";

export default defineComponent({
  name: "DetailsInfoComponent",

  components: {
    Info,
  },

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
});
</script>
