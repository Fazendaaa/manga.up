<template>
  <div v-if="error"></div>
  <Suspense v-else>
    <template #default>
      <RandomDisplay :numberOfItems="numberOfItems" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="lime"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import RandomDisplay from "@/views/Display/RandomDisplay.vue";

export default defineComponent({
  name: "RandomShowcaseComponent",

  components: {
    RandomDisplay,
  },

  props: {
    numberOfItems: Number,
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

<style lang="scss" scoped>
.container {
  height: 200px;
  position: relative;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
