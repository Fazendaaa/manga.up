<template>
  <div>
    <h1
      class="subheading grey--text"
      v-html="$vuetify.locale.t('about.title')"
    />
    <h2
      class="subheading grey--text"
      v-html="$vuetify.locale.t('about.goals.title')"
    />
    <v-container class="my-5">
      <p v-html="$vuetify.locale.t('about.goals.intro')" />
      <br />
      <li v-html="$vuetify.locale.t('about.goals.items.first')" />
      <li v-html="$vuetify.locale.t('about.goals.items.second')" />
      <li v-html="$vuetify.locale.t('about.goals.items.third')" />
      <br />
      <p v-html="$vuetify.locale.t('about.goals.remaining')" />
    </v-container>
    <v-btn :to="{ name: 'Policy' }">
      <v-icon>mdi-text-box-multiple</v-icon>
      <span> {{ $vuetify.locale.t("policy.title") }} </span>
    </v-btn>
    <div v-for="(item, index) in items" v-bind:key="index">
      <h2
        class="subheading grey--text"
        v-html="$vuetify.locale.t(`about.${item}.title`)"
      />
      <v-container class="my-5">
        <p v-html="$vuetify.locale.t(`about.${item}.content`)" />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutComponent",

  setup() {
    return {
      items: ["support", "security", "precautions", "futureGoals"],
    };
  },
});
</script>
