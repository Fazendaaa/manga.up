<template>
  <!-- https://vuetifyjs.com/en/components/autocompletes/ -->
  <v-card>
    <v-card-title class="text-h5 font-weight-regular blue-grey white--text">
      Search for something interesting to read
    </v-card-title>
    <v-card-text>
      <v-subheader class="pa-0">
        Look for something familiar, then go from the from there
      </v-subheader>
      <v-autocomplete
        v-model="model"
        :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
        :items="states"
        :readonly="!isEditing"
        :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`"
        persistent-hint
        prepend-icon="mdi-city"
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
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    };
  },
});
</script>

<style lang="scss"></style>
