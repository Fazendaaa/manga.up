<script setup lang="ts">
  import { ref } from 'vue'

  const query = ref('')

  const reset = (evt) => {
    query.value = '' // clears the query
  }
</script>

<template>
  <div>
    <h2>Search mangas:</h2>
    <input type="text" placeholder="Filter Search" v-model="query" />
    <p>
      {{ query }}
    </p>
    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
