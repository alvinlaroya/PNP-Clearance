<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6"
            >PNP Clearance | Applicant Record</v-card-title
          >
          <v-card-subtitle>List of applicants</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark @click="addClearance()"
                    >Add Applicant</v-btn
                  >
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Applicant"
                    single-line
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-toolbar>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="allApplicant"
            loading-text="Loading... Please wait"
            no-results-text="No Available Article"
            class="elevation-0"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    color="green"
                    @click="renewClearance(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-autorenew
                  </v-icon>
                </template>
                <span>Renew Application</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    color="green"
                    @click="editItem(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-file-document-edit
                  </v-icon>
                </template>
                <span>Update Applicant</span>
              </v-tooltip>
            </template>
            <template v-slot:item.dateOfBirth="{ item }">
              {{ dateFormat(item.dateOfBirth) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="renewDialog" :width="hasRelatedCase ? 900 : 500">
      <v-card>
        <v-card-title class="text-h5"> Related Criminal Case </v-card-title>

        <v-card-text v-if="hasRelatedCase">
          <v-container fluid style="margin-top: -15px">
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
                        <td>{{ item.status ? "Pending" : "None" }}</td>
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
          </v-container>
        </v-card-text>
        <v-card-text v-else>
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <h1>No Related Criminal Cases</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="hasRelatedCase"
            color="error"
            text
            @click="renewDialog = false"
          >
            Discard
          </v-btn>
          <v-btn v-else color="error" text @click="renewDialog = false">
            Close
          </v-btn>
          <v-btn color="primary" text @click="proceedToRenew"> Proceed </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters: mapGettersAuth } = createNamespacedHelpers("auth");
const { mapGetters: mapGettersNavigation, mapActions: mapActionsNavigation } =
  createNamespacedHelpers("navigation");

export default {
  data: () => ({
    dialog: false,
    renewDialog: false,
    currentItem: {},
    viewDialog: false,
    dialogDisplayImage: "",
    search: "",
    tab: null,
    items: [
      { label: "Pending", count: 0 },
      { label: "Issued", count: 0 },
    ],
    headers: [
      {
        text: "Actions",
        value: "actions",
        align: "start",
        sortable: false,
        width: 100,
      },
      { text: "Last name", value: "lname" },
      { text: "First name", value: "fname" },
      { text: "Middle name", value: "mname" },
      { text: "Address", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Age", value: "age" },
      { text: "Civil Status", value: "civilStatus" },
      { text: "Citizenship", value: "citizenship" },
      { text: "Date of Birth", value: "dateOfBirth", width: 154 },
      { text: "Place of Birth", value: "placeOfBirth" },
      { text: "Height", value: "height" },
      { text: "Weight", value: "weight" },
    ],
    printObj: {
      id: "printMe",
      popTitle: "Police Clearance",
      extraCss: "../../assets/css/style.css",
      extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      beforeOpenCallback(vue) {
        vue.printLoading = true;
        console.log("打开之前");
      },
      openCallback(vue) {
        vue.printLoading = false;
        console.log("执行了打印");
      },
      closeCallback(vue) {
        console.log("关闭了打印工具");
      },
    },
  }),
  watch: {
    badges: {
      handler() {
        this.setBadge();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActionsNavigation([
      "fetchApplicant",
      "setCurrentClearance",
      "approveClearanceAction",
      "searchCase",
      "setHasRelatedDialog",
      "setCurrentClearanceToRenew",
      "printClearance",
    ]),
    proceedToRenew() {
      this.$router.push({ name: "clearance.renew" });
    },
    renewClearance(item) {
      this.renewDialog = true;
      this.setCurrentClearanceToRenew(item);
      this.searchCase({
        fname: item.fname,
        mname: item.mname,
        lname: item.lname,
      });
    },
    setHasRelated(bool) {
      this.setHasRelatedDialog(bool);
    },
    editItem(item) {
      this.setCurrentClearance(item);
      this.$router.push({ name: "applicant.update" });
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
    addClearance() {
      this.$router.push({ name: "applicant.create" });
    },
    displayImage(src) {
      return `http://localhost:8000/${src}`;
    },
    viewImage(src) {
      this.dialog = true;
      this.dialogDisplayImage = src;
    },
  },
  computed: {
    ...mapGettersAuth(["currentUser"]),
    ...mapGettersNavigation(["allApplicant", "relatedCase", "hasRelatedCase"]),
  },
  mounted() {
    this.fetchApplicant();
  },
};
</script>

<style>
@import "../../assets/css/style.css";
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
