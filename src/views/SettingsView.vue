<template>
  <User />
  <Login />
  <Settings />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/components/User.vue";
import Settings from "@/components/Settings.vue";
import Login from "@/components/Login.vue";

export default defineComponent({
  name: "SettingsView",
  components: {
    User,
    Settings,
    Login,
  },
});
</script>
