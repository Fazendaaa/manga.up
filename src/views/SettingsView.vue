<template>
  <div :class="{ center: $vuetify.display.xs }">
    <User />
    <Login />
    <Settings />
    <Themes />
  </div>
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

<style lang="scss" scoped>
.center {
  position: fixed;
  top: 35%;
  width: 100%;
}
</style>
