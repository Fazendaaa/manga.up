<template>
  <div>
    <h1 class="subheading grey--text">About</h1>
    <h2 class="subheading grey--text">Goals</h2>
    <v-container class="my-5">
      <p><strong>Manga.up</strong> is meant to be:</p>
      <br />
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
      <br />
      <p>
        If you have an old tablet laying around or even want to buy and old one
        just to read mangas; this app is meant to help you. We all have been
        there wanting to read all the mangas but find to troublesome to binding
        read in the laptop screen and too uncomfortable to read at the
        smartphone. If you add this website in your smartphone you will be able
        to receive the notifications and read right at moment or just open the
        same website later on in your tablet or PC at home to read it.
      </p>
      <br />
      <p>
        The goal is to give the same experience through a plethora of devices.
        Helping you to focus in what matter:
        <strong><i>to keep a health read experience</i></strong>
      </p>
    </v-container>
    <h2 class="subheading grey--text">Support</h2>
    <v-container class="my-5">
      <p>
        Right now we provide support to
        <href src="https://mangadex.org/">MangaDex</href> but we are looking
        into supporting many other platforms.
      </p>
    </v-container>
    <h2 class="subheading grey--text">Security</h2>
    <v-container class="my-5">
      <p>
        Besides helping you stay focus and up to date in your favorites the idea
        behind <strong>Manga.up</strong> is also to act like an true
        application, the user won't need to send us any kind of information,
        your data will be encrypted and stored in your device and your device
        only it will be able to ever hold your data.
      </p>
    </v-container>
    <h2 class="subheading grey--text">Precautions</h2>
    <v-container class="my-5">
      <p>
        As <strong>Manga.up</strong> acts kind a true app, even tho if you are
        logged to MangaDex, for now there's syncing user content to our servers.
        So, if you ever loose your data, that's on you!
      </p>
      <p>
        The idea is to connect the user data to their preferred cloud provider
        so that data can stay safe there.
      </p>
    </v-container>
    <h2 class="subheading grey--text">Future Goals</h2>
    <v-container class="my-5">
      <p>
        Even though <strong>Manga.up</strong> focus mainly in manga content --
        hence the name --, in a non so distance future, the idea is o implement
        or even support self-hosted content servers; that way
        <strong>YOU</strong>, the user, can host your own content and consume it
        from anywhere, share it with your loved ones and maintain alive the
        memory of those incredible histories.
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutComponent",

  data() {
    return {
      items: [
        {
          message: "A free software implementation -- 'free' as in beer",
        },
        {
          message:
            "A collaboration tool -- anyone can fix and suggest improvements",
        },
        {
          message: "A reader experience first and foremost",
        },
      ],
    };
  },
});
</script>
