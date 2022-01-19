<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-btn color="pink" text="white">click me</v-btn>
    <v-btn color="pink" depressed>click me</v-btn>
    <v-btn flat color="pink">click me</v-btn>

    <v-btn depressed large color="purple">
      <v-icon left>email</v-icon>
      <span>email me</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",

  data() {
    return {};
  },
});
</script>
