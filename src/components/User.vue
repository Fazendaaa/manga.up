<template>
  <div>
    <v-btn @click="toggle = !toggle">
      <span>User</span>
      <v-icon>mdi-account-box-outline</v-icon>
    </v-btn>
    <div v-show="toggle">
      <v-avatar size="180" class="grey lighten-2">
        <img
          src="https://raw.githubusercontent.com/Fazendaaa/manga.up/master/public/img/icons/logo.svg"
        />
      </v-avatar>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserComponent",

  data() {
    return {
      toggle: false,
    };
  },
});
</script>
