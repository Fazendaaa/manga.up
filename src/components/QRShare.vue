<template>
  <QRCodeVue3
    :width="size"
    :height="size"
    :value="list"
    :image="image"
    :imageOptions="{
      margin: 0,
      imageSize: 0.4,
      hideBackgroundDots: true,
    }"
    :qrOptions="{
      mode: 'Byte',
      typeNumber: 0,
      errorCorrectionLevel: 'H',
    }"
    :dotsOptions="{
      type: 'dots',
      color: '#26249a',
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: '#26249a',
          },
          {
            offset: 1,
            color: '#26249a',
          },
        ],
      },
    }"
    :backgroundOptions="{
      color: '#ffffff',
    }"
    :cornersSquareOptions="{
      type: 'dot',
      color: '#000000',
    }"
    :cornersDotOptions="{
      type: undefined,
      color: '#000000',
    }"
    fileExt="png"
    :download="false"
    myclass="my-qur"
    imgclass="img-qr"
    downloadButton="my-button"
    :downloadOptions="{
      name: 'vqr',
      extension: 'png',
    }"
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
      size: 400,
      list: JSON.stringify(list),
      image: "/img/icons/pwa-192x192.png",
    };
  },
});
</script>
