<template>
  <!-- <p>Manga: {{ id }}</p> -->
  <div v-if="error">Error while loading social media share</div>
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
import { computed, defineComponent, onErrorCaptured, ref } from "vue";
import { useRoute } from "vue-router";
import Reader from "@/components/Reader.vue";

export default defineComponent({
  name: "ReaderView",

  setup() {
    const route = useRoute();
    const id = computed(() => {
      const id =
        "string" == typeof route.params.id
          ? route.params.id
          : route.params.id[0];

      return id.toUpperCase();
    });
    const error = ref(false);
    const errorMessage = ref("");
    const cached = false;

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    return {
      id,
      error,
      cached,
      errorMessage,
    };
  },

  components: {
    Reader,
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
