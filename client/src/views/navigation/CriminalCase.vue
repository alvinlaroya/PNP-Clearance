<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6"
            >PNP Clearance | Criminal Cases</v-card-title
          >
          <v-card-subtitle>List of criminal cases</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark @click="dialog = true"
                    >Add Criminal Case</v-btn
                  >
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Case"
                    single-line
                    style="margin-top: 10px"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="allCase"
            loading-text="Loading... Please wait"
            no-results-text="No Available Article"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" color="green" @click="editItem(item)">
                mdi-file-document-edit
              </v-icon>
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ dateTimeFormat(item.createdAt) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="650">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Criminal Case
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="criminalCase.serialNo"
                    :rules="requiredRules"
                    label="Serial No"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="4">
                  <v-text-field
                    v-model="criminalCase.fname"
                    :rules="requiredRules"
                    label="First name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="criminalCase.mname"
                    :rules="requiredRules"
                    label="Middle name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="criminalCase.lname"
                    :rules="requiredRules"
                    label="Last name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog = false"> Close </v-btn>
          <v-btn color="success" text @click="validate"> Save case </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="650">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Criminal Case
        </v-card-title>

        <v-card-text>
          <v-form ref="editForm" v-model="validEdit" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentCase.serialNo"
                    :rules="requiredRules"
                    label="Serial No"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="4">
                  <v-text-field
                    v-model="currentCase.fname"
                    :rules="requiredRules"
                    label="First name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="currentCase.mname"
                    :rules="requiredRules"
                    label="Middle name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="currentCase.lname"
                    :rules="requiredRules"
                    label="Last name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="[editDialog = false, criminalCase = {}]"> Close </v-btn>
          <v-btn color="success" text @click="editValidate"> Save Changes </v-btn>
        </v-card-actions>
      </v-card>
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
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    dialog: false,
    editDialog: false,
    search: "",
    totalArticles: 0,
    items: [
      { label: "All", count: 0 },
      { label: "Verified", count: 0 },
    ],
    criminalCase: {
      serialNo: "",
      fname: "",
      mname: "",
      lname: "",
    },
    currentCase: {},
    headers: [
      {
        text: "Actions",
        value: "actions",
        align: "start",
        sortable: false,
        width: 100,
      },
      {
        text: "Serial Number",
        value: "serialNo",
      },
      { text: "First name", value: "fname" },
      { text: "Middle name", value: "mname" },
      { text: "Last name", value: "lname" },
      { text: "Create at", value: "createdAt" },
    ],
    valid: true,
    validEdit: true,
    requiredRules: [(v) => !!v || "This field is required"],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    caseBadges: {
      handler() {
        this.setBadge();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["fetchCase", "addCase", "updateCase"]),
    editItem(item) {
      this.currentCase = item
      this.editDialog = true
    },
    downloadItem(item) {
      console.log(item);
    },
    dateFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
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
    setBadge() {
      this.items[0].count = this.count;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.addCase(this.criminalCase);
        this.$refs.form.reset();
        this.snackbar = true
        this.snackbarText = "Criminal Case Created!"
        this.dialog = false
      }
    },
    editValidate() {
      const valid = this.$refs.editForm.validate();
      if (valid) {
        this.updateCase(this.currentCase);
        this.snackbar = true
        this.snackbarText = "Criminal Case Updated!"
        this.editDialog = false
      }
    },
  },
  computed: {
    ...mapGetters(["allCase", "caseBadges"]),
  },
  created() {
    this.setBadge();
  },
  mounted() {
    this.fetchCase();
  },
};
</script>

<style></style>
