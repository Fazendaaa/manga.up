<template>
  <v-btn
    v-if="!account"
    @click="SignIn"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>login</span>
    <v-icon>mdi-microsoft</v-icon>
  </v-btn>
  <v-btn v-else @click="SignOut" target="_blank" rel="noopener noreferrer">
    <span>logout</span>
    <v-icon>mdi-microsoft</v-icon>
  </v-btn>
  <div v-if="account">{{ account.name }}</div>
</template>

<script lang="ts">
import { PublicClientApplication } from "@azure/msal-browser";

export default {
  name: "ActiveDirectoryComponent",
  data() {
    return {
      account: undefined,
    };
  },
  async created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig
    );
  },
  mounted() {
    const accounts = this.$msalInstance.getAllAccounts();
    if (0 == accounts.length) {
      return;
    }
    this.account = accounts[0];
    this.$emitter.emit("login", this.account);
  },
  methods: {
    async SignIn() {
      await this.$msalInstance
        .loginPopup({})
        .then(() => {
          const myAccounts = this.$msalInstance.getAllAccounts();
          this.account = myAccounts[0];
          this.$emitter.emit("login", this.account);
        })
        .catch((error: Error) => {
          console.error(`error during authentication: ${error}`);
        });
    },
    async SignOut() {
      await this.$msalInstance
        .logout({})
        .then(() => {
          this.$emitter.emit("logout", "logging out");
        })
        .catch((error: Error) => {
          console.error(error);
        });
    },
  },
};
</script>
