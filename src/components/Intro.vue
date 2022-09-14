<template>
  <div>
    <h1 class="subheading grey--text">Intro</h1>
    <h2 class="subheading grey--text">
      The <strong>OFFLINE</strong> website manga app reader experience
    </h2>
    <v-container class="my-5">
      <p>
        Manga.up is a project meant to help anyone that wants to read manga
        <strong>WHEREVER</strong> the device -- tablet, computer, smartphone --
        at <strong>ANYTIME</strong>.
      </p>
      <p>
        The goal is to achieve seamless integration to your lifestyle no matter
        how hard this can look right now so you can rest assured whether is
        during commuting time, before getting to bed or even taking a dump, you
        will always have a away to read everything where you left.
      </p>
      <p>
        You can see it as a podcast player, where it looks for content in the
        server hosted by the podcast creator itself and you choose the player
        from your liking. Just like that, <strong>manga.up</strong> is a
        "player" where the content is not stored in itself but fetched from
        another source.
      </p>
      <p>
        Right now we provide support to
        <href src="https://mangadex.org/">MangaDex</href> but we are looking
        into supporting many other platforms, so to currently use the system you
        will need to log into your MangaDex's account.
      </p>
      <v-btn :to="{ name: 'About' }">
        <v-icon>mid-information-outline</v-icon>
        <span>About this project</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IntroComponent",

  data() {
    return {};
  },
});
</script>
