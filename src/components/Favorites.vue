<template>
  <AddToFavorites :id="id" v-if="toAdd" />
  <RemoveFromFavorites :id="id" v-else />
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import AddToFavorites from "./AddToFavorites.vue";
import RemoveFromFavorites from "./RemoveFromFavorites.vue";

export default defineComponent({
  name: "FavoritesComponent",

  components: {
    AddToFavorites,
    RemoveFromFavorites,
  },

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup(props) {
    // const { id } = toRefs(props);
    const toAdd = ref(true);

    return {
      toAdd,
    };
  },
});
</script>
