<template>
  <DisplayReader :id="id" :open="open" :page="page" />
  <NavigationReader :id="id" />
  <ShareReader :id="id" />
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DisplayReader from "@/views/Reader/DisplayReader.vue";
import NavigationReader from "@/views/Reader/NavigationReader.vue";
import ShareReader from "./Reader/ShareReader.vue";

const stringToBoolean = (value: string): boolean => {
  if (undefined === value || "" === value) {
    return false;
  }

  return "true" === value;
};

export default defineComponent({
  name: "ReaderView",

  components: {
    DisplayReader,
    NavigationReader,
    ShareReader,
  },

  setup() {
    const route = useRoute();
    const id = ref(route.params.id as string);
    const open = ref(stringToBoolean(route.query.open as string));
    const page = ref(route.query.page as string);
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
      }
    );
    watch(
      () => route.query.open,
      (newOpen) => {
        open.value = stringToBoolean(newOpen as string);
      }
    );
    watch(
      () => route.query.page,
      (newPage) => {
        page.value = newPage as string;
      }
    );

    return {
      id,
      open,
      page,
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
