<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title class="ml-2"
                >Renew Clearance Application</v-card-title
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
                    <v-col cols="5">
                      <v-text-field
                        v-model="clearance.address"
                        :rules="requiredRules"
                        label="Address"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="clearance.citizenship"
                        :rules="requiredRules"
                        label="Citizenship"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.placeOfBirth"
                        :rules="requiredRules"
                        label="Place of Birth"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-menu
                        v-model="birthDateMenu"
                        :close-on-content-click="true"
                        :nudge-left="20"
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
                    <v-col cols="6">
                      <v-text-field
                        v-model="clearance.purpose"
                        :rules="requiredRules"
                        label="Purpose"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="clearance.amount"
                        :rules="requiredRules"
                        prefix="₱"
                        label="Amount"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.phone"
                        :rules="requiredRules"
                        prefix="+639"
                        hint="Enter your phone except the 09 digit (ex. 388566223)"
                        persistent-hint
                        label="Phone"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.orNumber"
                        :rules="requiredRules"
                        label="OR Number"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="clearance.ctcNumber"
                        :rules="requiredRules"
                        label="CTC Number"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-menu
                        v-model="issuedOnMenu"
                        :close-on-content-click="true"
                        :nudge-left="20"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="clearance.issuedOn"
                            label="Issued On"
                            prepend-inner-icon="mdi-calendar"
                            flat
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="clearance.issuedOn"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="clearance.cop"
                        :items="allPolice"
                        label="Chief of Police"
                        item-text="fullname"
                        item-value="fullname"
                        flat
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="12">
                      <h4>Attachments</h4>
                      <v-chip
                        @click="viewImage(clearance.idPicture)"
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left> mdi-image-area </v-icon>
                        IdPicture.jpg
                      </v-chip>
                      <v-chip
                        @click="viewImage(clearance.cedula)"
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left> mdi-image-area </v-icon>
                        Cedula.jpg
                      </v-chip>
                      <v-chip
                        @click="viewImage(clearance.ort)"
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left> mdi-image-area </v-icon>
                        ORT.jpg
                      </v-chip>
                      <v-chip
                        @click="viewImage(clearance.barangayClearance)"
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left> mdi-image-area </v-icon>
                        BarangayClearance.jpg
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row align="center" justify="end">
                    <!-- <v-checkbox
                      v-model="clearance.verified"
                      :label="clearance.verified ? 'Verified' : 'Not Verified'"
                      required
                    ></v-checkbox> -->
                    <v-btn
                      color="success"
                      class="mr-4 ml-5"
                      x-large
                      @click="validate"
                    >
                      Save Application
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="attachDialog" width="500">
      <v-img :src="displayImage(attachDialogSrc)" style="width: 100%"></v-img>
    </v-dialog>
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
    attachDialog: false,
    attachDialogSrc: "",
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
        text: "Renew Clearance Application",
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
    clearance: {},
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
    ],
  }),
  computed: {
    ...mapGetters(["relatedCase", "currentClearanceRenew", "allPolice"]),
  },
  methods: {
    ...mapActions([
      "addClearance",
      "renewClearance",
      "searchCase",
      "updateClearance",
      "fetchPolice",
    ]),
    viewImage(src) {
      this.attachDialog = true;
      this.attachDialogSrc = src;
    },
    displayImage(src) {
      return `http://localhost:8000/${src}`;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.clearance.id = null;
        this.renewClearance({
          fname: this.clearance.fname,
          mname: this.clearance.mname,
          lname: this.clearance.lname,
          address: this.clearance.address,
          dateOfBirth: this.clearance.dateOfBirth,
          placeOfBirth: this.clearance.placeOfBirth,
          age: this.clearance.age,
          civilStatus: this.clearance.civilStatus,
          citizenship: this.clearance.citizenship,
          height: this.clearance.height,
          weight: this.clearance.weight,
          purpose: this.clearance.purpose,
          phone: this.clearance.phone,
          orNumber: this.clearance.orNumber,
          ctcNumber: this.clearance.ctcNumber,
          amount: this.clearance.amount,
          issuedOn: this.clearance.issuedOn,
          verified: this.clearance.verified,
          idPicture: this.clearance.idPicture,
          pnco: this.clearance.pnco,
          cop: this.clearance.cop,
          barangayClearance: this.clearance.barangayClearance,
          cedula: this.clearance.cedula,
          ort: this.clearance.ort,
          issued: false,
          numberOfIssued: 1,
        });
        this.snackbar = true;
        this.snackbarText = "Police Clearance Application Updated!";
        this.$router.replace({ name: "navigation.dashboard" });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    selectIdPicture(file) {
      this.clearance.idPicture = file;
    },
    selectedBarangayClearance(file) {
      this.clearance.barangayClearance = file;
    },
    selectedCedula(file) {
      this.clearance.cedula = file;
    },
    selectedOrt(file) {
      this.clearance.ort = file;
    },
    toFormData(obj) {
      var fd = new FormData();
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    },
    searchCrimeCase() {
      this.searchCase(this.search);
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
  created() {
    this.clearance = this.currentClearanceRenew;
  },
};
</script>

<style></style>
