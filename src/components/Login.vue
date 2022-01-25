<template>
  <v-btn>
    <span>Login</span>
  </v-btn>
  <p>Available accounts:</p>
  <ul>
    <li v-for="service in services" :key="service.name">
      {{ service.name }}
    </li>
  </ul>
  <ActiveDirectory />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActiveDirectory from "./ActiveDirectory.vue";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      services: [
        { name: "Apple" },
        { name: "Gmail" },
        { name: "Active Directory" },
        { name: "Facebook" },
        { name: "Twitter" },
        { name: "Instagram" },
        { name: "Reddit" },
        { name: "Github" },
      ],
    };
  },
  components: { ActiveDirectory },
});
</script>
