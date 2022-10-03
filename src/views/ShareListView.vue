<template>
  <div class="center">
    {{ name }}

    <Suspense>
      <template #default>
        <QRShare :name="name" />
      </template>
      <template #fallback>
        <v-progress-circular
          class="center"
          :size="50"
          color="orange"
          indeterminate
      /></template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import QRShare from "../components/QRShare.vue";

export default defineComponent({
  name: "ShareListView",

  setup() {
    const route = useRoute();
    const name = computed(() => {
      if (undefined !== route.params.name) {
        const name =
          "string" == typeof route.params.name
            ? route.params.name
            : route.params.name[0];
        return name.toUpperCase();
      } else {
        return "";
      }
    });

    return {
      name,
    };
  },
  components: { QRShare },
});
</script>

<style lang="scss" scoped>
.center {
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
