<template>
  <User />
  <Login />
  <Settings />
  <Themes />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/components/User.vue";
import Settings from "@/components/Settings.vue";
import Login from "@/components/Login.vue";
import Themes from "@/components/Themes.vue";

export default defineComponent({
  name: "SettingsView",
  components: {
    User,
    Settings,
    Login,
    Themes,
  },
});
</script>
