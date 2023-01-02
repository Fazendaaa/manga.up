<template>
  <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
    {{ $vuetify.locale.t("install.message") }}

    <template v-slot:actions>
      <v-btn text color="green" @click="install">{{
        $vuetify.locale.t("install.confirm")
      }}</v-btn>
      <v-btn text color="red" @click="dismiss">{{
        $vuetify.locale.t("install.dismiss")
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

      if ("" !== Cookies.get("add-to-home-screen")) {
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
