<template>
  <!-- Sources -->
  <!-- Where to buy -->
  <!-- MAL -->
  <!-- ANILIST -->
  <!-- NetFlix -->
  <!-- Amazon Prime -->
  <!-- Crunchyroll -->
  <!-- etc -->
  others
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OthersInfoComponent",

  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
});
</script>
