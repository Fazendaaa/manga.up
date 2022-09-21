<template>
  <div v-if="error">Error while loading navigation</div>
  <Suspense v-else>
    <template #default>
      <ReaderNavigation :id="id" />
    </template>
    <template #fallback> loading navigation... </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import ReaderNavigation from "@/components/ReaderNavigation.vue";

export default defineComponent({
  name: "NavigationReaderView",

  components: {
    ReaderNavigation,
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
