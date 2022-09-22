<template>
  <DisplayReader :id="id" />
  <NavigationReader :id="id" />
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref, watch } from "vue";
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
    const id = ref(route.params.id as string);
    const error = ref(false);
    const errorMessage = ref("");

    onErrorCaptured((e) => {
      errorMessage.value = `${e}`;
      error.value = true;
      return true;
    });

    watch(
      () => route.params.id,
      (newId) => {
        id.value = newId as string;
        console.log("watch");
        console.log(id.value);
      }
    );

    return {
      id,
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

.status {
  margin: 0;
  position: absolute;
  top: 75%;
  left: 51%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
