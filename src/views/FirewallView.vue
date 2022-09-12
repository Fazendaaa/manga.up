<template>
  <h1>Please login</h1>
  <Login />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "@/components/Login.vue";

export default defineComponent({
  name: "FirewallComponent",
  components: {
    Login,
  },
});
</script>
