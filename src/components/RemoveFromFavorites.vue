<template>
  <div class="text-center ma-2">
    <v-btn @click="snackbar = true">
      <v-icon>mdi-delete-empty</v-icon>
      <span> Remove from favorites </span>
    </v-btn>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { addToReadList } from "@/scripts/lists";
import { defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  name: "RemoveFromFavoritesComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup(props) {
    const { id } = toRefs(props);
    const snackbar = ref(false);
    const text = ref("");

    watch(snackbar, async (newSnackbar) => {
      if (newSnackbar) {
        const added = await addToReadList(id.value);
        text.value = added
          ? // ? "Manga successful removed"
            "Not Implemented yet"
          : "Error while adding manga to read list";
      }
    });

    return {
      text,
      snackbar,
      addToReadList,
    };
  },
});
</script>
