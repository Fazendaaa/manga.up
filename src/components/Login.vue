<template>
  <p>Available accounts:</p>
  <ul>
    <li v-for="service in services" :key="service.name">
      {{ service.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginComponent",

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
});
</script>
