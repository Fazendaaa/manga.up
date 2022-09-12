<template>
  <v-btn
    v-if="!user"
    @click="handleClickSignIn"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>login</span>
    <v-icon>mdi-google</v-icon>
  </v-btn>
  <v-btn
    v-else
    @click="handleClickSignOut"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>logout</span>
    <v-icon>mdi-google</v-icon>
  </v-btn>
  <div v-if="user">{{ user }}</div>
  <br />
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from "vue";
import { Vue3GoogleOauth } from "vue3-google-oauth2";

export default defineComponent({
  name: "GoogleComponent",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickGetAuthCode() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },
  setup(props) {
    // @ts-expect-error: don't know why, still not fluent in vue
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth: Vue3GoogleOauth = inject<Vue3GoogleOauth>(
      "Vue3GoogleOauth"
    ) || {
      isInit: false,
      isAuthorized: false,
    };
    // eslint-disable-next-line
    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
});
</script>
