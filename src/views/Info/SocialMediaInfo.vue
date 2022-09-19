<template>
  <Suspense>
    <template #default>
      <SocialMedia :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Social...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SocialMedia from "@/components/SocialMedia.vue";

export default defineComponent({
  name: "SocialMediaInfoComponent",

  components: {
    SocialMedia,
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
