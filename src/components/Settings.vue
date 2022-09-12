<template>
  <v-btn @click="toggle = !toggle">
    <span>Settings options</span>
    <v-icon>mdi-cog-outline</v-icon>
  </v-btn>
  <div v-show="toggle">
    <ul>
      <li v-for="option in settings" :key="option.title">
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsComponent",
  data() {
    return {
      toggle: false,
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
