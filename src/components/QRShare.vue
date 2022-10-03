<template>
  <QRCodeVue3
    :width="200"
    :height="200"
    :value="list"
    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
    :dotsOptions="{
      type: 'dots',
      color: '#26249a',
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [
          { offset: 0, color: '#26249a' },
          { offset: 1, color: '#26249a' },
        ],
      },
    }"
    :backgroundOptions="{ color: '#ffffff' }"
    :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
    :cornersDotOptions="{ type: undefined, color: '#000000' }"
    fileExt="png"
    :download="false"
    myclass="my-qur"
    imgclass="img-qr"
    downloadButton="my-button"
    :downloadOptions="{ name: 'vqr', extension: 'png' }"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { getList } from "@/scripts/lists";
import QRCodeVue3 from "qrcode-vue3";

export default defineComponent({
  name: "QRShareComponent",

  components: {
    QRCodeVue3,
  },

  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    const { name } = toRefs(props);
    const list = {
      name: name.value,
      items: await getList().catch(() => {
        return {};
      }),
    };

    return {
      list,
    };
  },
});
</script>
