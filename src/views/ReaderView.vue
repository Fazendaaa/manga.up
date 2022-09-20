<template>
  <!-- <p>Manga: {{ id }}</p> -->
  <div v-if="error">Error while loading social media share</div>
  <Suspense v-else>
    <template #default>
      <Reader :id="id" />
    </template>
    <template #fallback>
      <div class="container">
        <v-progress-circular
          class="center"
          :size="50"
          color="pink"
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

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    return {
      id,
      error,
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
</style>
