<template>
  <div v-if="error">Error while loading title</div>
  <Suspense v-else>
    <template #default>
      <Header :id="id" />
    </template>
    <template #fallback>
      <h1>Loading Title...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
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
