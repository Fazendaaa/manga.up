<template>
  <p>{{ id }}</p>
  <div>{{ data }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoComponent",
  props: {
    id: String,
  },
  async created() {
    const username = process.env.VUE_APP_MD_USERNAME;
    const password = process.env.VUE_APP_MD_PASSWORD;
    const email = process.env.VUE_APP_MD_EMAIL;

    return {
      username,
      password,
      email,
      data: await this.fetchInfo(username, password, email),
    };
  },
  methods: {
    fetchInfo: async (username: string, password: string, email: string) => {
      return fetch("https://api.mangadex.org/auth/login/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }).then((res) => {
        if (!res.ok) {
          // create error instance with HTTP status text
          const error = new Error(res.statusText);

          console.error(error);

          throw error;
        }
        return res.json();
      });
    },
  },
});
</script>
