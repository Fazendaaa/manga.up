<template>
  <Suspense>
    <template #default>
      <Header :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Title...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "HeaderInfoComponent",

  components: {
    Header,
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
