<template>
  <Contact />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contact from "@/components/Contact.vue";

export default defineComponent({
  name: "ContactView",

  components: {
    Contact,
  },
});
</script>
