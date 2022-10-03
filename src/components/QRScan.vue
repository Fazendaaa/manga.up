<template>
  <qrcode-stream @decode="onDecode" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QrcodeStream } from "qrcode-reader-vue3";

const onDecode = (QRCode: string) => {
  const data = JSON.parse(QRCode);
};

export default defineComponent({
  name: "QRScanComponent",

  components: {
    QrcodeStream,
  },

  setup() {
    return {
      onDecode,
    };
  },
});
</script>
