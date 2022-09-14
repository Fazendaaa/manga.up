<template>
  <p>{{ id }}: Info</p>
  <!-- <div>{{ data }}</div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Token {
  session: string;
  refresh: string;
}

interface ResponseToken {
  result: string;
  token: Token;
}

export default defineComponent({
  name: "InfoComponent",
  props: {
    id: String,
  },
  async created() {
    const username = process.env.VUE_APP_MD_USERNAME;
    const password = process.env.VUE_APP_MD_PASSWORD;
    const email = process.env.VUE_APP_MD_EMAIL;
    const token: Token = await this.fetchToken(username, password, email);

    console.log(token);
  },
  methods: {
    fetchToken: async (username: string, password: string, email: string) => {
      return fetch("https://api.mangadex.org/auth/login", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then((result: ResponseToken) => result["token"])
        .catch((error) => console.log("error", error));
    },
  },
});
</script>
