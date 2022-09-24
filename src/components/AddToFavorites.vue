<template>
  <div class="text-center ma-2">
    <v-btn @click="snackbar = true">
      <v-icon>mdi-bookmark-plus-outline</v-icon>
      <span> {{ title }} </span>
    </v-btn>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          {{ close }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { addToReadList } from "@/scripts/lists";
import { defineComponent, ref, toRefs, watch } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "AddToFavoritesComponent",

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
    const translator = useLocale();
    const text = ref("");
    const title = translator.t("addToFavorites.title");
    const close = translator.t("addToFavorites.close");
    const success = translator.t("addToFavorites.success");
    const error = translator.t("addToFavorites.error");

    watch(snackbar, async (newSnackbar) => {
      if (newSnackbar) {
        const added = await addToReadList(id.value);
        text.value = added ? success : error;
      }
    });

    return {
      title,
      close,
      text,
      snackbar,
      addToReadList,
    };
  },
});
</script>
