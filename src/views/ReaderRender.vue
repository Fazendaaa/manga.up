<template>
  <div class>
    <ReaderRender />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ReaderRender from '@/components/ReaderRender.vue'

  export default defineComponent({
    name: 'Reader',
    components: {
      ReaderRender,
    },
  })
</script>
