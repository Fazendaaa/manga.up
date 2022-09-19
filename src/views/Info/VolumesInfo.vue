<template>
  <div v-if="error">Error while loading social media share</div>
  <Suspense v-else>
    <template #default>
      <Volumes :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Volumes...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
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
