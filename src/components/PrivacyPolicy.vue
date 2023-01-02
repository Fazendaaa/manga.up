<template>
  <div>
    <h1
      class="subheading grey--text"
      v-html="$vuetify.locale.t('policy.title')"
    />
    <div v-html="$vuetify.locale.t('policy.content')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrivacyPolicyContent",
});
</script>

<style lang="scss" scoped>
div {
  white-space: pre-wrap;
}
</style>
