<template>
  <v-card>
    <v-card-title>
      <h1><strong>Manga.up</strong>: <strong>OFFLINE</strong> manga reader</h1>
    </v-card-title>
    <v-card-subtitle class="subheading grey--text">
      <h1>
        Read <strong>WHATEVER</strong> the device <strong>ANYTIME</strong>
      </h1>
    </v-card-subtitle>
    <v-card-text class="my-5">
      <p>
        <strong>Manga.up</strong> is a project meant to help anyone that wants
        to read manga in all devices -- tablet, computer, smartphone,
        smart-fridge -- at their own time.
      </p>
      <br />
      <p>
        The goal is to achieve seamless integration to your lifestyle no matter
        how hard this can look right now so you can rest assured whether is
        during commuting time, before getting to bed or even taking a dump, you
        will always have a away to read everything where you left.
      </p>
      <br />
      <p>
        You can see it as a podcast player, where it looks for content in the
        server hosted by the podcast creator itself and you choose the player
        from your liking. Just like that, <strong>manga.up</strong> is a
        "player" where the content is not stored in itself but fetched from
        another source.
      </p>
      <br />
      <p>
        <v-icon>mdi-alert</v-icon>
        <strong>THIS IS A BETA IMPLEMENTATION</strong>:
        <i>"use it at your own risk"</i>
      </p>
      <br />
      <p>
        In case that you want to have your own version of
        <strong>manga.up</strong> as a self-hosted option, please take a look at
        our about page:
      </p>
      <br />
      <v-btn :to="{ name: 'About' }">
        <v-icon>mid-information-outline</v-icon>
        <span>About this project</span>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IntroComponent",
});
</script>
