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
                        label="Phone"
                        required
                        outlined
                        hint="Enter your phone except the 09 digit (ex. 388566223)"
                        persistent-hint
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
                            readonly
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
                  <v-row class="mt-0">
                    <v-col cols="3">
                      <v-file-input
                        v-model="clearance.idPicture"
                        @change="selectIdPicture"
                        accept="image/*"
                        label="ID Picture"
                        outlined
                      ></v-file-input>
                    </v-col>
                    <v-col cols="3">
                      <v-file-input
                        v-model="clearance.barangayClearance"
                        @change="selectedBarangayClearance"
                        accept="image/*"
                        label="Barangay Clearance"
                        outlined
                      ></v-file-input>
                    </v-col>
                    <v-col cols="3">
                      <v-file-input
                        v-model="clearance.cedula"
                        @change="selectedCedula"
                        accept="image/*"
                        label="Cedula"
                        outlined
                      ></v-file-input>
                    </v-col>
                    <v-col cols="3">
                      <v-file-input
                        v-model="clearance.ort"
                        @change="selectedOrt"
                        accept="image/*"
                        label="ORT"
                        outlined
                      ></v-file-input>
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
                </v-container>
                <!--  <v-container fluid style="margin-top: -15px">
                  <h2>Related Criminal Case</h2>
                  <v-row class="mt-0" style="margin-bottom: -40px">
                    <v-col cols="5">
                      <v-text-field
                        v-model="search"
                        label="Enter Applicant Name"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        :disabled="!valid"
                        color="primary"
                        @click="searchCrimeCase"
                        x-large
                      >
                        <v-icon left> mdi-magnify </v-icon>
                        Search
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="12">
                      <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Serial No</th>
                              <th class="text-left">First Name</th>
                              <th class="text-left">Middle Name</th>
                              <th class="text-left">Last Name</th>
                              <th class="text-left">Status</th>
                              <th class="text-left">Created At</th>
                            </tr>
                          </thead>
                          <tbody v-if="relatedCase.length > 0 && relatedCase">
                            <tr v-for="item in relatedCase" :key="item.name">
                              <td>{{ item.serialNo }}</td>
                              <td>{{ item.fname }}</td>
                              <td>{{ item.mname }}</td>
                              <td>{{ item.lname }}</td>
                              <td>{{ item.status ? "Active" : "Pending" }}</td>
                              <td>{{ dateTimeFormat(item.createdAt) }}</td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr style="text-align: center">
                              <td colspan="5">No criminal case related</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container> -->
                <v-container fluid>
                  <v-row align="center" justify="end">
                    <!-- <v-checkbox
                      v-model="clearance.verified"
                      :label="clearance.verified ? 'Verified' : 'Not Verified'"
                      required
                    ></v-checkbox> -->
                    <v-btn
                      :disabled="!valid"
                      :color="clearance.verified ? 'error' : 'primary'"
                      @click="setVerified"
                      x-large
                    >
                      {{ clearance.verified ? "Not Verified" : "Verified" }}
                    </v-btn>
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
      purpose: "",
      phone: "",
      orNumber: "",
      ctcNumber: "",
      amount: 0,
      issuedAt: "",
      issuedOn: "",
      verified: 0,
      idPicture: null,
      pnco: "",
      cop: "",
      barangayClearance: null,
      cedula: null,
      ort: null,
      issued: false,
      numberOfIssued: 1,
    },
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
  mounted() {
    this.clearance.fname = this.currentClearanceRenew.fname;
    this.clearance.mname = this.currentClearanceRenew.mname;
    this.clearance.lname = this.currentClearanceRenew.lname;
    this.clearance.address = this.currentClearanceRenew.address;
    this.clearance.dateOfBirth = this.currentClearanceRenew.dateOfBirth;
    this.clearance.placeOfBirth = this.currentClearanceRenew.placeOfBirth;
    this.clearance.age = this.currentClearanceRenew.age;
    this.clearance.civilStatus = this.currentClearanceRenew.civilStatus;
    this.clearance.citizenship = this.currentClearanceRenew.citizenship;
    this.clearance.height = this.currentClearanceRenew.height;
    this.clearance.weight = this.currentClearanceRenew.weight;
    this.clearance.phone = this.currentClearanceRenew.phone;
  },
  methods: {
    ...mapActions(["addClearance", "searchCase", "fetchPolice"]),
    setVerified() {
      this.clearance.verified = !this.clearance.verified;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var formData = this.toFormData(this.clearance);
        this.addClearance(formData);
        this.$refs.form.reset();
        this.snackbar = true;
        this.snackbarText = "Police Clearance Application Created!";
        this.$router.replace({ name: "navigation.dashboard" });

        this.$swal({
          position: "center",
          icon: "success",
          title: "Clearance Application Successfully Created!",
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
};
</script>

<style></style>
