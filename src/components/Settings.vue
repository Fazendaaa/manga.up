<template>
  <v-btn>
    <span>Settings options</span>
  </v-btn>
  <ul>
    <li v-for="option in settings" :key="option.title">
      {{ option.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsComponent",
  data() {
    return {
      settings: [
        { title: "download user content" },
        { title: "notifications" },
        { title: "downloads" },
        { title: "devices" },
        { title: "my servers" },
      ],
    };
  },
});
</script>
