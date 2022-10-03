<template>
  <qrcode-stream @decode="onDecode" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QrcodeStream } from "qrcode-reader-vue3";

export default defineComponent({
  name: "QRScanComponent",

  components: {
    QrcodeStream,
  },

  setup() {
    const onDecode = (data: string) => console.log(data);

    return {
      onDecode,
    };
  },
});
</script>
