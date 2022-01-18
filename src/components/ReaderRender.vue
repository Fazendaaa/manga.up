<template>
  <div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ReaderRender',
    data() {
      return {
        images: [
          'https://picsum.photos/200/200',
          'https://picsum.photos/300/200',
          'https://picsum.photos/250/200',
        ],
      }
    },
    methods: {
      show() {
        this.$viewerApi({
          images: this.images,
        })
      },
    },
  })
</script>

<style scoped lang="scss"></style>
