<template>
  <div>
    <v-card-subtitle class="font-weight-bold"
      >Summary Word Count</v-card-subtitle
    >
    <v-text-field
      v-model="summary.minimum"
      dense
      label="Minimum"
      hint="Below the value will appear the count display in red text other-wise it will appear orange"
      :counter="true"
      :rules="minimumRules"
      persistent-hint
      outlined
      :success="summary.minimum.length >= 10"
      :class="[{
        'orange-message': summary.minimum.length >= 10
      }]"
    ></v-text-field>
    <v-text-field
      v-model="summary.standard"
      dense
      label="Standard"
      hint="Equal or greater than this value will appear the count display in green text"
      :counter="true"
      :rules="standardRules"
      persistent-hint
      outlined
      :success="summary.standard.length >= 80"
    ></v-text-field>
    <v-text-field
      v-model="summary.maximum"
      dense
      label="Maximum"
      hint="Greater than this value will appear the count display in red text"
      :counter="100"
      :rules="maximumRules"
      persistent-hint
      outlined
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    summary: {
      minimum: 10,
      standard: 80,
      maximum: 100,
    },
    minimumRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 10) || "This field must have atleast 10 characters",
    ],
    standardRules: [
      (v) => !!v || "Name is required",
    ],
    maximumRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 100) || "Maximum must be less than 100 characters",
    ],
  }),
  methods: {
    
  }
};
</script>

<style lang="postcss" scoped>
/deep/ .orange-message .v-counter {
  color: orange !important;
}
</style>
