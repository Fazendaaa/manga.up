<template>
  <div>
    <v-avatar size="180" class="grey lighten-2">
      <img
        src="https://raw.githubusercontent.com/Fazendaaa/manga.up/feature/vue3Vuetify/public/img/icons/logo.svg"
      />
    </v-avatar>
    <p>Linked accounts:</p>
    <ul>
      <li v-for="service in services" :key="service.name">
        {{ service.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserComponent",

  data() {
    return {
      services: [{ name: "Anilist" }, { name: "MAL" }],
    };
  },
});
</script>
