<template>
  <vue-picture-swipe :items="items" :options="options"></vue-picture-swipe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VuePictureSwipe from "vue3-picture-swipe";

export default defineComponent({
  name: "ReaderComponent",

  components: {
    VuePictureSwipe,
  },

  data() {
    return {
      options: {
        shareEl: false,
        preload: [1, 4],
      },
      items: [
        {
          src: "https://i.imgur.com/uNhQ5jv.png",
          thumbnail: "https://i.imgur.com/uNhQ5jv.png",
          w: 637,
          h: 953,
        },
        {
          src: "https://i.imgur.com/lmvtwb5.png",
          thumbnail: "https://i.imgur.com/lmvtwb5.png",
          w: 637,
          h: 953,
        },
        {
          src: "https://i.imgur.com/jUKbxbW.png",
          thumbnail: "https://i.imgur.com/jUKbxbW.png",
          w: 637,
          h: 953,
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.test {
  max-height: 10%;
  max-width: 10%;
}
</style>
