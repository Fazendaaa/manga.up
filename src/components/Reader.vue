<template>
  <div>
    <viewer :images="images" :options="options">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReaderRender",
  data() {
    return {
      // https://github.com/fengyuanchen/viewerjs#options
      options: {
        backdrop: true,
        navbar: 4,
        title: false,
        toolbar: {
          zoomIn: true,
          prev: true,
          play: true,
          next: true,
          oneToOne: true,
          zoomOut: true,
          reset: false,
          rotateLeft: false,
          rotateRight: false,
          flipHorizontal: false,
          flipVertical: false,
        },
      },
      // https://imgur.com/a/MbCYD
      images: [
        "https://i.imgur.com/uNhQ5jv.png",
        "https://i.imgur.com/lmvtwb5.png",
        "https://i.imgur.com/jUKbxbW.png",
      ],
    };
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
  },
});
</script>

<style scoped lang="scss">
img {
  max-width: 10%;
  height: 10%;
}
</style>
