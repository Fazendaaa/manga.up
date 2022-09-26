<template>
  <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
    {{ $vuetify.locale.getScope().t("install.message") }}

    <template v-slot:actions>
      <v-btn text color="primary" @click="install">{{
        $vuetify.locale.getScope().t("install.confirm")
      }}</v-btn>
      <v-btn text color="error" @click="dismiss">{{
        $vuetify.locale.getScope().t("install.dismiss")
      }}</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cookies from "js-cookie";

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
      if (Cookies.get("add-to-home-screen") === undefined) {
        this.deferredPrompt = e;
      }
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },

  methods: {
    async dismiss() {
      Cookies.set("add-to-home-screen", "", { expires: 15 });
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
  },
});
</script>
