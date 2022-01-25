<template>
  <v-btn @click="toggle = !toggle">
    <span>Logins</span>
    <v-icon>mdi-login</v-icon>
  </v-btn>
  <div v-show="toggle">
    <ActiveDirectory />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActiveDirectory from "./providers/ActiveDirectory.vue";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      toggle: false,
    };
  },
  components: { ActiveDirectory },
});
</script>
