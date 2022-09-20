<template>
  <div v-if="error">Error while loading details</div>
  <div v-else>
    <Suspense>
      <template #default>
        <Info :id="id" />
      </template>
      <template #fallback>
        <h1>Loading Info...</h1>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <Statistics :id="id" />
      </template>
      <template #fallback>
        <h1>Loading Statistics...</h1>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import Info from "@/components/Info.vue";
import Statistics from "@/components/Statistics.vue";

export default defineComponent({
  name: "DetailsInfoComponent",

  components: {
    Info,
    Statistics,
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
