<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title class="ml-2"
                >Create Clearance Application</v-card-title
              >
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.fname"
                        :rules="requiredRules"
                        label="First Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.mname"
                        :rules="requiredRules"
                        label="Middle Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.lname"
                        :rules="requiredRules"
                        label="Last Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-text-field
                        v-model="clearance.age"
                        :rules="requiredRules"
                        label="Age"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="clearance.civilStatus"
                        :rules="requiredRules"
                        label="Civil Status"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="7">
                      <v-text-field
                        v-model="clearance.address"
                        :rules="requiredRules"
                        label="Address"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="clearance.citizenship"
                        :rules="requiredRules"
                        label="Citizenship"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="6">
                      <v-text-field
                        v-model="clearance.placeOfBirth"
                        :rules="requiredRules"
                        label="Place of Birth"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        v-model="birthDateMenu"
                        :close-on-content-click="true"
                        :nudge-left="90"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="clearance.dateOfBirth"
                            label="Date of Birth"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            flat
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="clearance.dateOfBirth"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="2">
                      <v-text-field
                        v-model="clearance.height"
                        :rules="requiredRules"
                        label="Height"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="clearance.weight"
                        :rules="requiredRules"
                        label="Weight"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.phone"
                        :rules="requiredRules"
                        prefix="+639"
                        label="Phone"
                        required
                        outlined
                        hint="Enter your phone except the 09 digit (ex. 388566223)"
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row align="center" justify="end">
                    <v-btn
                      color="success"
                      class="mr-4 ml-5"
                      x-large
                      @click="validate"
                    >
                      Save Applicant
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      :right="true"
      :top="true"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    birthDateMenu: null,
    issuedAtMenu: null,
    issuedOnMenu: null,
    breadcrumbs: [
      {
        text: "Police Clearance",
        disabled: false,
        href: "dashboard",
      },
      {
        text: "Add Clearance Application",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
    valid: true,
    name: "",
    requiredRules: [(v) => !!v || "This field is required"],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    search: "",
    clearance: {
      fname: "",
      mname: "",
      lname: "",
      address: "",
      dateOfBirth: "",
      placeOfBirth: "",
      age: 0,
      civilStatus: "",
      citizenship: "",
      height: "",
      weight: "",
      phone: "",
    },
  }),
  computed: {
    ...mapGetters(["relatedCase", "allPolice"]),
  },
  methods: {
    ...mapActions(["addApplicant"]),
    setVerified() {
      this.clearance.verified = !this.clearance.verified;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.addApplicant(this.clearance);
        this.$refs.form.reset();
        this.snackbar = true;
        this.snackbarText = "Applicant Created!";
        this.$router.replace({ name: "navigation.applicant" });

        this.$swal({
          position: "center",
          icon: "success",
          title: "Applicant Successfully Created!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    dateTimeFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style></style>
