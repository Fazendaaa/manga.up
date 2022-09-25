<template>
  <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
    Get our free app. It won't take up space on your phone and also works
    offline!

    <template v-slot:actions>
      <v-btn text @click="dismiss">Dismiss</v-btn>
      <v-btn text @click="install">Install</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InstallBanner",

  data() {
    return {
      deferredPrompt: null,
    };
  },

  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },

  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
  },
});
</script>
