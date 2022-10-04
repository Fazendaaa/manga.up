<template>
  <qrcode-stream @decode="onDecode" />

  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title class="text-h5"> Add the following mangas? </v-card-title>
      <v-card-text>
        <pre>{{ mangas }}</pre>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
        </v-btn>
        <v-btn color="red darken-1" text @click="dialog = false">
          Disagree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { QrcodeStream } from "qrcode-reader-vue3";
import { IList } from "@/scripts/lists";
import { getManga } from "@/scripts/manga";

const showInfo =
  (dialog: Ref<boolean>, mangas: Ref<string>) => async (QRCode: string) => {
    const data: IList = JSON.parse(QRCode);

    mangas.value = await Promise.all(
      Object.keys(data.items).map((item) => getManga(item))
    ).then((result) =>
      result.reduce((prev, cur) => `${prev}\n${cur.attributes.title.en}`, "")
    );
    dialog.value = true;
  };

export default defineComponent({
  name: "QRScanComponent",

  components: {
    QrcodeStream,
  },

  setup() {
    const dialog = ref(false);
    const mangas = ref("");

    return {
      dialog,
      mangas,
      onDecode: showInfo(dialog, mangas),
    };
  },
});
</script>
