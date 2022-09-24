<template>
  <v-btn @click="toggle = !toggle">
    <span>Logins</span>
    <v-icon>mdi-login</v-icon>
  </v-btn>
  <div v-show="toggle">CONFIGURE IT</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",

  data() {
    return {
      toggle: false,
    };
  },
});
</script>
