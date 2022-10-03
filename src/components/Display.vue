<template>
  <h1
    :class="{
      // 'ma-9 pa-9': $vuetify.display.xs,
      'subheading grey--text': !$vuetify.display.xs,
    }"
  >
    {{ header }}
  </h1>

  <v-carousel cycle hide-delimiter-background>
    <v-carousel-item row v-for="(rowSub, index) in subjects" :key="index">
      <v-layout>
        <v-card
          v-for="subject in rowSub"
          :key="subject.id"
          flat
          align="center"
          width="300"
          height="385"
          class="mx-auto my-12 text-xs-center ma-3 `pa-3 manga ${subject.status}`"
        >
          <router-link
            flat
            style="text-decoration: none; color: inherit"
            :to="{ name: 'Info', params: { id: subject.id } }"
          >
            <v-responsive class="pt-4">
              <v-avatar size="180" class="grey lighten-2">
                <img :src="subject.cover" :width="size" :height="size" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ subject.title }}</div>
              <div class="grey--text">{{ subject.chapters }}</div>
              <div class="center">
                <v-chip
                  small
                  :class="`${subject.status} white--text my-2 caption`"
                  >{{ subject.status }}</v-chip
                >
              </div>
            </v-card-text>
          </router-link>
          <v-card-actions class="justify-center align-baseline">
            <Favorites :id="subject.id" />
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { toRefs, defineComponent, ref, watch } from "vue";
import { IManga, searchMangaCoverPreview } from "@/scripts/mangadex";
import Favorites from "./Favorites.vue";

export interface IDisplay {
  id: string;
  title: string;
  chapters: string;
  score: string;
  cover: string;
  status: string;
}

const parseMangas = async (mangas: IManga[]): Promise<IDisplay[]> => {
  const subjects: IDisplay[] = [];
  let chapters: string;

  for (const manga of mangas) {
    switch (typeof manga["attributes"]["lastChapter"]) {
      case "string":
        chapters = manga["attributes"]["lastChapter"];

        if ("" === chapters && "ongoing" !== manga["attributes"]["status"]) {
          chapters = "?";
        }

        break;
      case "number":
        chapters = manga["attributes"]["lastChapter"].toString();
        break;
      default:
        chapters = "?";
    }

    const cover = manga["relationships"].filter(
      (relationship) => "cover_art" === relationship.type
    )[0];

    subjects.push({
      id: manga["id"],
      title: manga["attributes"]["title"]["en"],
      chapters,
      score: "10",
      status: manga["attributes"]["status"],
      cover: await searchMangaCoverPreview(manga["id"], cover["id"]),
    });
  }

  return subjects;
};

const redistributeMangas = (
  mangas: IDisplay[],
  columns: number
): IDisplay[][] => {
  const subjects: IDisplay[][] = [];
  let counter = 0;
  let lastRow = 0;

  for (const manga of mangas.flat()) {
    if (columns === counter) {
      counter = 0;
    }
    if (0 === counter) {
      subjects.push([]);
    }

    lastRow = subjects.length - 1;

    subjects[lastRow].push(manga);

    counter += 1;
  }

  return subjects;
};

export default defineComponent({
  name: "DisplayComponent",

  components: {
    Favorites,
  },

  props: {
    header: String,
    // https://forum.vuejs.org/t/vue-typescript-problem-with-component-props-array-type-declaration/29478/15
    mangas: {
      type: Array as () => Array<IManga>,
      required: true,
      default: () => [],
    },
  },

  async setup(props) {
    const { mangas } = toRefs(props);
    const itemsToShow = ref(3);
    const issues = ref<IDisplay[]>([]);
    const subjects = ref<IDisplay[][]>([]);

    watch(itemsToShow, (newNumber) => {
      subjects.value = redistributeMangas(issues.value, newNumber);
    });
    issues.value = await parseMangas(mangas.value);
    subjects.value = redistributeMangas(issues.value, itemsToShow.value);

    return {
      size: 180,
      subjects,
      itemsToShow,
    };
  },

  methods: {
    onResize() {
      // xs
      if (window.innerWidth < 600) {
        this.itemsToShow = 1;
        return;
      }
      // sm
      if (600 <= window.innerWidth && window.innerWidth < 960) {
        this.itemsToShow = 2;
        return;
      }
      // md
      if (960 <= window.innerWidth && window.innerWidth < 1264) {
        this.itemsToShow = 3;
        return;
      }
      // lg
      if (1264 <= window.innerWidth && window.innerWidth < 1904) {
        this.itemsToShow = 3;
        return;
      }
      // lg
      else {
        this.itemsToShow = 4;
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

<style scoped lang="scss">
.v-chip.completed {
  background: #18a17c;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.hiatus {
  background: #f83e70;
}
.v-chip.cancelled {
  background: #a1188a;
}
.v-chip.published {
  background: #f5c242;
}
</style>
