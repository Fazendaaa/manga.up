<template>
  <div>
    <User />
    <Settings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/components/User.vue";
import Settings from "@/components/Settings.vue";

export default defineComponent({
  name: "SettingsView",
  components: {
    User,
    Settings,
  },
});
</script>
