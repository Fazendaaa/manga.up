<template>
  <div>
    <p>{{ id }}</p>
    <Info />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Info from "@/components/Info.vue";

export default defineComponent({
  name: "InfoView",
  components: {
    Info,
  },
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id.toUpperCase());

    return { id };
  },
});
</script>
