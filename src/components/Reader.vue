<script lang="ts">
  import {
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
  } from 'vue-flux'
  import { ref } from 'vue'

  const vfOptions = () => {
    return {
      autoplay: true,
    }
  }

  const vfImages = () => [
    'https://cdn.pixabay.com/photo/2021/08/02/18/11/covid-6517476_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_960_720.jpg',
    'blob:https://mangadex.org/79566cbe-c9b7-4752-80c2-f70a043566fb',
  ]

  const vfTransitions = () => ['fade', 'cube', 'book', 'wave']

  const vfCaptions = () => [
    'Caption for image 1',
    'Caption for image 2',
    'Caption for image 3',
  ]
</script>

<template>
  <vue-flux
    :options="vfOptions"
    :images="vfImages"
    :transitions="vfTransitions"
    :captions="vfCaptions"
    ref="slider"
  >
    <template v-slot:preloader>
      <flux-preloader />
    </template>

    <template v-slot:caption>
      <flux-caption />
    </template>

    <template v-slot:controls>
      <flux-controls />
    </template>

    <template v-slot:pagination>
      <flux-pagination />
    </template>

    <template v-slot:index>
      <flux-index />
    </template>
  </vue-flux>

  <button @click="$refs.slider.show('next')">NEXT</button>
</template>
