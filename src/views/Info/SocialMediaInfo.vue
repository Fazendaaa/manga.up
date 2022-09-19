<template>
  <div v-if="error">Error while loading social media share</div>
  <Suspense v-else>
    <template #default>
      <SocialMedia :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Social...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
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

  setup() {
    const error = ref(false);
    const errorMessage = ref("");

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    return {
      error,
      errorMessage,
    };
  },
});
</script>
