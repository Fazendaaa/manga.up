<template>
  <p>{{ id }}: Info</p>
  <!-- <div>{{ data }}</div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { fetchToken, Token } from "@/scripts/mangadex";

export default defineComponent({
  name: "InfoComponent",

  props: {
    id: String,
  },

  async created() {
    const token = process.env.VUE_APP_MD_TOKEN_SESSION;
    const session = process.env.VUE_APP_MD_TOKEN_REFRESH;

    console.log(token);
    console.log(session);
  },
});
</script>
