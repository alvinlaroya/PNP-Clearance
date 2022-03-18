<template>
  <v-form ref="generalForm" v-model="valid" lazy-validation>
    <v-checkbox
      v-model="imageCaption"
      label="Require image Caption"
      :persistent-hint="true"
      hint="This will require image caption line 1 upon submit for editing or publish; Unchecking will disable all image caption fields."
    >
    </v-checkbox>
    <v-checkbox
      v-model="metaDesc"
      label="Require Meta Description"
      :persistent-hint="true"
      hint="This will require description upon submit for editing or publish; Unchecking will hide the field."
    >
    </v-checkbox>
    <v-checkbox
      v-model="videoTextField"
      label="Show Video Text field"
      :persistent-hint="true"
      hint="This will show video text field in the writer/editor panels."
    >
    </v-checkbox>
    <v-checkbox
      v-model="videoProcess"
      label="Enable Video Process"
      :persistent-hint="true"
      hint="This will show video text field in the writer/editor panels."
    >
    </v-checkbox>

    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <summary-form></summary-form>
        </v-col>
        <v-col cols="6">
          <content-form></content-form>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      block
      large
    >
      Save
    </v-btn>
  </v-form>
</template>

<script>
import ContentForm from "./ContentForm.vue";
import SummaryForm from "./SummaryForm.vue";
export default {
  components: { SummaryForm, ContentForm },
  data: () => ({
    valid: true,
    imageCaption: true,
    metaDesc: false,
    videoTextField: false,
    videoProcess: false,
  }),

  methods: {
    validate() {
      this.$refs.generalForm.validate();
    },
    reset() {
      this.$refs.generalForm.reset();
    },
    resetValidation() {
      this.$refs.generalForm.resetValidation();
    },
  },
};
</script>

<style lang="postcss" scoped>
.form-input >>> .v-input__slot::after {
  border-color: rgba(255, 255, 255, 0.7) !important;
}

.form-input >>> .v-input__slot::before {
  border-color: rgba(255, 255, 255, 0.7) !important;
}
.form-input >>> .error--text {
  color: blue !important;
}
.form-input >>> input {
  caret-color: white !important;
}
</style>
