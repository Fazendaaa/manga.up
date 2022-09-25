<template>
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title>Share it:</v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-if="error">Error while loading social share</div>
        <Suspense v-else>
          <template #default>
            <ShareChapter :id="id" />
          </template>
          <template #fallback>
            <div align="center">loading navigation...</div>
          </template>
        </Suspense>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import ShareChapter from "@/components/ShareChapter.vue";

export default defineComponent({
  name: "ShareReaderView",

  components: {
    ShareChapter,
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
