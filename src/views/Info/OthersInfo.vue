<template>
  <div v-if="error">Error while loading others</div>
  <Suspense v-else>
    <template #default>
      <Others :id="id" />
    </template>
    <template #fallback>
      <h1>Loading outsourced information...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import Others from "@/components/Others.vue";

export default defineComponent({
  name: "OthersInfoComponent",

  components: {
    Others,
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
