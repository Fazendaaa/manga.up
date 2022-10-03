<template>
  <QRScan />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QRScan from "@/components/QRScan.vue";

export default defineComponent({
  name: "ScanView",

  components: {
    QRScan,
  },

  // setup() {},
});
</script>
