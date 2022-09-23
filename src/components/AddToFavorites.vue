<template>
  <div class="text-center ma-2">
    <v-btn @click="snackbar = true">
      <v-icon>mdi-bookmark-plus-outline</v-icon>
      <span> Add to favorites </span>
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup() {
    const snackbar = ref(false);
    const text = ref(`Is added?`);

    return {
      text,
      snackbar,
    };
  },
});
</script>
