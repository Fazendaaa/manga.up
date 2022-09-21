<template>
  <DisplayReader :id="id" />
  <NavigationReader :id="id" />
</template>

<script lang="ts">
import { computed, defineComponent, onErrorCaptured, ref } from "vue";
import { useRoute } from "vue-router";
import DisplayReader from "@/views/Reader/DisplayReader.vue";
import NavigationReader from "@/views/Reader/NavigationReader.vue";

export default defineComponent({
  name: "ReaderView",

  components: {
    DisplayReader,
    NavigationReader,
  },

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
