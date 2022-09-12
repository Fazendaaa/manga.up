<template>
  <!-- https://vuetifyjs.com/en/components/autocompletes/ -->
  <v-card>
    <v-card-title class="text-h5 font-weight-regular blue-grey white--text">
      Search for something interesting to read
    </v-card-title>
    <v-card-text>
      <v-subheader class="pa-0">
        Just release your imagination, find something interesting here
      </v-subheader>
      <v-autocomplete
        v-model="model"
        :label="`Search here`"
        persistent-hint
        prepend-icon="mdi-magnify"
      >
        <template v-slot:append-outer>
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon
              :key="`icon-${isEditing}`"
              :color="isEditing ? 'success' : 'info'"
              @click="isEditing = !isEditing"
              v-text="
                isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'
              "
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchComponent",
  data() {
    return {
      isEditing: false,
      model: null,
    };
  },
});
</script>

<style lang="scss"></style>
