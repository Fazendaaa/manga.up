<template>
  <v-no-ssr>
    <v-app :theme="this.$store.state.theme">
      <v-main>
        <InstallBanner />
        <Headline />
        <NavBar />
        <v-layout style="z-index: 0">
          <v-navigation-drawer
            class="hidden-md-and-down"
            :width="width"
          ></v-navigation-drawer>
          <v-navigation-drawer
            class="hidden-md-and-down"
            :width="width"
            location="right"
          ></v-navigation-drawer>
          <v-main>
            <div :class="{ 'ma-4 pa-4': !$vuetify.display.xs }">
              <router-view :key="$route.path" />
            </div>
          </v-main>
        </v-layout>
      </v-main>
    </v-app>
  </v-no-ssr>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import Headline from "@/components/Headline.vue";
import InstallBanner from "@/components/InstallBanner.vue";

export default defineComponent({
  name: "App",

  components: {
    NavBar,
    Headline,
    InstallBanner,
  },

  setup() {
    return {
      width: ref(300),
    };
  },

  methods: {
    onResize() {
      if (window.innerWidth < 1765) {
        this.width = 300;
        return;
      } else {
        this.width = 750;
        return;
      }
    },
  },

  beforeUnmount() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize);
  },

  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },
});
</script>
