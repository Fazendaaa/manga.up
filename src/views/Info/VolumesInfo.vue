<template>
  <Suspense>
    <template #default>
      <Volumes :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Volumes...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Volumes from "@/components/Volumes.vue";

export default defineComponent({
  name: "VolumesInfoComponent",

  components: {
    Volumes,
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
