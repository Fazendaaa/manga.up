<template>
  <div v-if="error">Error while loading this chapter</div>
  <Suspense v-else>
    <template #default>
      <Reader :id="id" />
    </template>
    <template #fallback>
      <div v-if="cached" class="container">
        <div class="status">Reading from device ...</div>
        <v-progress-circular
          class="center"
          :size="50"
          color="green"
          indeterminate
        />
      </div>
      <div v-else class="container">
        <div class="status">Downloading ...</div>
        <v-progress-circular
          class="center"
          :size="50"
          color="purple"
          indeterminate
        />
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import Reader from "@/components/Reader.vue";

export default defineComponent({
  name: "DisplayReaderView",

  components: {
    Reader,
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
    const cached = false;

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    return {
      error,
      cached,
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

.status {
  margin: 0;
  position: absolute;
  top: 75%;
  left: 51%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
