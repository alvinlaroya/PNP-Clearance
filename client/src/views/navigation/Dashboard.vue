<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6"
            >PNP Clearance | Police Clearance Application</v-card-title
          >
          <v-card-subtitle>List of police clearances</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark @click="addClearance()"
                    >Add Application</v-btn
                  >
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Clearance"
                    single-line
                    style="margin-top: 10px"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <template v-slot:extension>
              <v-tabs v-model="tab" slider-color="blue">
                <v-tabs-slider color="blue"></v-tabs-slider>

                <v-tab v-for="(item, i) in items" :key="i">
                  <v-badge
                    color="error"
                    :value="item.count"
                    :content="item.count"
                  >
                    {{ item.label }}
                  </v-badge>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-data-table
                :search="search"
                :headers="headers"
                :items="allClearance"
                show-expand
                single-expand
                loading-text="Loading... Please wait"
                no-results-text="No Available Article"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon class="mr-2" color="green" @click="editItem(item)">
                    mdi-file-document-edit
                  </v-icon>
                  <v-icon class="mr-2" color="blue" @click="viewItem(item)">
                    mdi-dots-horizontal
                  </v-icon>
                </template>
                <template v-slot:item.dateOfBirth="{ item }">
                  {{ dateFormat(item.dateOfBirth) }}
                </template>
                <template v-slot:item.amount="{ item }">
                  ₱{{ item.amount }}
                </template>
                <template v-slot:item.issuedAt="{ item }">
                  {{ dateTimeFormat(item.issuedAt) }}
                </template>
                <template v-slot:item.issuedOn="{ item }">
                  {{ dateTimeFormat(item.issuedOn) }}
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td>
                    <v-chip
                      @click="viewImage(item.idPicture)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      IdPicture.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.cedula)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      Cedula.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.ort)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      ORT.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.barangayClearance)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      BarangayClearance.jpg
                    </v-chip>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                :search="search"
                :headers="headers"
                :items="verifiedClearance"
                show-expand
                single-expand
                loading-text="Loading... Please wait"
                no-results-text="No Available Article"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon class="mr-2" color="green" @click="editItem(item)">
                    mdi-file-document-edit
                  </v-icon>
                  <v-icon class="mr-2" color="blue" @click="viewItem(item)">
                    mdi-dots-horizontal
                  </v-icon>
                </template>
                <template v-slot:item.dateOfBirth="{ item }">
                  {{ dateFormat(item.dateOfBirth) }}
                </template>
                <template v-slot:item.amount="{ item }">
                  ₱{{ item.amount }}
                </template>
                <template v-slot:item.issuedAt="{ item }">
                  {{ dateTimeFormat(item.issuedAt) }}
                </template>
                <template v-slot:item.issuedOn="{ item }">
                  {{ dateTimeFormat(item.issuedOn) }}
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td>
                    <v-chip
                      @click="viewImage(item.idPicture)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      IdPicture.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.cedula)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      Cedula.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.ort)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      ORT.jpg
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      @click="viewImage(item.barangayClearance)"
                      class="ma-2"
                      color="primary"
                      text-color="white"
                    >
                      <v-icon left> mdi-image-area </v-icon>
                      BarangayClearance.jpg
                    </v-chip>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-img
        :src="displayImage(dialogDisplayImage)"
        style="width: 100%"
      ></v-img>
    </v-dialog>
    <v-dialog v-model="viewDialog" width="1000">
      <v-card class="rounded-0">
        <v-card-text id="printMe" class="all">
          <v-container class="pa-15">
            <v-row>
              <v-col cols="2" class="col1">
                <v-img
                  class="image1"
                  contain
                  max-height="86"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Philippine_National_Police_seal.svg/1200px-Philippine_National_Police_seal.svg.png"
                ></v-img>
              </v-col>
              <v-col cols="8" class="header-print">
                <div class="header-text">Republic of the Philippines</div><br />
                <div class="header-text">NATIONAL POLICE COMMISSION</div><br />
                <div class="header-text redText">PHILIPPINE NATIONAL POLICE</div><br />
                <div class="header-text redText">POLICE REGIONAL OFFICE 1</div><br />
                <div class="header-text">Pangasinan Police Provincial Office</div><br />
                <div class="header-text">Sison Municipal Police Station</div><br />
                <div>Sison, Pangasinan</div>
              </v-col>
              <v-col cols="2" class="col2">
                <v-img
                  class="image2"
                  contain
                  max-height="86"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Philippine_National_Police_seal.svg/1200px-Philippine_National_Police_seal.svg.png"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <table>
                  <tr class="tr1">
                    <th class="th1">Reg. No</th>
                    <th class="th2">Date Applied</th>
                    <th class="th3">Country</th>
                    <th class="th4">ORIGINAL COPY</th>
                  </tr>
                  <tr class="tr2">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row class="mt-0 towhom">
              <v-col cols="12">
                <h5>TO WHOM IT MAY CONCERN:</h5>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="a1">
                <span class="a2"
                  >This is to certify that the person whose name, picture and
                  thumb prints appear hereon has requested a RECORD CLEARANCE
                  from this office and the result(s) is/are listed below:</span
                ><br />
                <div class="a3">
                  <span
                    ><span class="bold">Address:</span> <u>{{ currentItem.address }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Date of Birth:</span> <u>{{ dateFormat(currentItem.dateOfBirth) }}</u> <span class="bold">Place
                    of Birth:</span> <u>{{ currentItem.placeOfBirth }}</u> <span class="bold">Age:</span>
                    <u>{{ currentItem.age }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Civil Status:</span>
                    <u>{{ currentItem.civilStatus }}</u> <span class="bold">Citizenship:</span>
                    <u>{{ currentItem.citizenship }}</u> <span class="bold">Height:</span>
                    <u>{{ currentItem.height }}</u> <span class="bold">Weight:</span>
                    <u>{{ currentItem.weight }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Purpose:</span> <u>{{ currentItem.purpose }}</u></span
                  >
                </div>
              </v-col>
              <v-col cols="4">
                <div class="a4"></div>
                <div class="a5">
                  <hr />
                  <span class="signature">Signature of Applicant</span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7">
                <div>
                  <span class="a6"
                    >Remarks:
                    <span class="a7"
                      >No Criminal Record on File from this Office</span
                    ></span
                  ><br />
                  <span>Not Valid without official seal and thumbprints</span
                  ><br />
                  <span class="a6"
                    >Checked and verified from the records by:</span
                  >
                </div>
              </v-col>
              <v-col cols="5" class="colb1">
                <table class="table">
                  <tr class="trmany">
                    <td>Phone/CP #</td>
                    <td class="tdwidth">{{ currentItem.phone }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>CTC #</td>
                    <td class="tdwidth">{{ currentItem.ctcNumber }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued at:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedAt) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued on:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedOn) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>OR#</td>
                    <td class="tdwidth">{{ currentItem.orNumber }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued on:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedOn) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Amount</td>
                    <td class="tdwidth">₱ {{ currentItem.amount }}</td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7">
                <v-row>
                  <v-col cols="6">
                    <div>
                      <hr />
                      <span>Duty Invest PNCO</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>
                      <hr />
                      <span>Chief of Police</span>
                    </div>
                  </v-col>
                  <v-col cols="12" class="valid">
                    <span class="validfortwo">VALID FOR SIX (6) MONTHS FROM DATE OF ISSUE</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="5">
                <table>
                  <tr class="trb1">
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class="trb2">
                    <td class="tdcenter">LEFT THUMB</td>
                    <td class="tdcenter">RIGHT THUMB</td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row class="cuthr">
              <v-col cols="12">
                <div class="borderDiv"></div>
              </v-col>
            </v-row>
            <v-row class="copydiv">
              <v-col cols="12">
                <table>
                  <tr class="tr1">
                    <th class="th1">Reg. No</th>
                    <th class="th2">Date Applied</th>
                    <th class="th3">Country</th>
                    <th class="th4">ORIGINAL COPY</th>
                  </tr>
                  <tr class="tr2">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row class="mt-0 towhom">
              <v-col cols="12">
                <h5>TO WHOM IT MAY CONCERN:</h5>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="a1">
                <span class="a2"
                  >This is to certify that the person whose name, picture and
                  thumb prints appear hereon has requested a RECORD CLEARANCE
                  from this office and the result(s) is/are listed below:</span
                ><br />
                <div class="a3">
                  <span
                    ><span class="bold">Address:</span> <u>{{ currentItem.address }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Date of Birth:</span> <u>{{ dateFormat(currentItem.dateOfBirth) }}</u> <span class="bold">Place
                    of Birth:</span> <u>{{ currentItem.placeOfBirth }}</u> <span class="bold">Age:</span>
                    <u>{{ currentItem.age }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Civil Status:</span>
                    <u>{{ currentItem.civilStatus }}</u> <span class="bold">Citizenship:</span>
                    <u>{{ currentItem.citizenship }}</u> <span class="bold">Height:</span>
                    <u>{{ currentItem.height }}</u> <span class="bold">Weight:</span>
                    <u>{{ currentItem.weight }}</u></span
                  ><br />
                  <span
                    ><span class="bold">Purpose:</span> <u>{{ currentItem.purpose }}</u></span
                  >
                </div>
              </v-col>
              <v-col cols="4">
                <div class="a4"></div>
                <div class="a5">
                  <hr />
                  <span class="signature">Signature of Applicant</span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7">
                <div>
                  <span class="a6"
                    >Remarks:
                    <span class="a7"
                      >No Criminal Record on File from this Office</span
                    ></span
                  ><br />
                  <span>Not Valid without official seal and thumbprints</span
                  ><br />
                  <span class="a6"
                    >Checked and verified from the records by:</span
                  >
                </div>
              </v-col>
              <v-col cols="5" class="colb1">
                <table class="table">
                  <tr class="trmany">
                    <td>Phone/CP #</td>
                    <td class="tdwidth">{{ currentItem.phone }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>CTC #</td>
                    <td class="tdwidth">{{ currentItem.ctcNumber }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued at:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedAt) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued on:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedOn) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>OR#</td>
                    <td class="tdwidth">{{ currentItem.orNumber }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Issued on:</td>
                    <td class="tdwidth">{{ dateTimeFormat(currentItem.issuedOn) }}</td>
                  </tr>
                  <tr class="trmany">
                    <td>Amount</td>
                    <td class="tdwidth">₱ {{ currentItem.amount }}</td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7">
                <v-row>
                  <v-col cols="6">
                    <div>
                      <hr />
                      <span>Duty Invest PNCO</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>
                      <hr />
                      <span>Chief of Police</span>
                    </div>
                  </v-col>
                  <v-col cols="12" class="valid">
                    <span class="personalcopy">PERSONAL COPY</span><br>
                    <span class="validfortwo">VALID FOR SIX (6) MONTHS FROM DATE OF ISSUE</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="5">
                <table>
                  <tr class="trb1">
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class="trb2">
                    <td class="tdcenter">LEFT THUMB</td>
                    <td class="tdcenter">RIGHT THUMB</td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="viewDialog = false"> Close</v-btn>
          <v-btn color="primary" text v-print="printObj">
            <v-icon>mdi-printer</v-icon> Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    dialog: false,
    currentItem: {},
    viewDialog: false,
    dialogDisplayImage: "",
    search: "",
    tab: null,
    items: [
      { label: "All", count: 0 },
      { label: "Verified", count: 0 },
    ],
    headers: [
      {
        text: "Actions",
        value: "actions",
        align: "start",
        sortable: false,
        width: 100,
      },
      {
        text: "First name",
        value: "fname",
      },
      { text: "Middle name", value: "mname" },
      { text: "Last name", value: "lname" },
      { text: "Address", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Age", value: "age" },
      { text: "Date of Birth", value: "dateOfBirth", width: 154 },
      { text: "Citizenship", value: "citizenship" },
      { text: "Civil Status", value: "civilStatus" },
      { text: "OR#", value: "orNumber" },
      { text: "Ammout", value: "amount" },
      { text: "Issued At", value: "issuedAt", width: 150 },
      { text: "Issued On", value: "issuedOn", width: 150 },
      { text: "Purpose", value: "purpose" },
      { text: "", value: "data-table-expand", fixed: true },
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
    ...mapActions(["fetchClearance", "setCurrentClearance"]),
    viewItem(item) {
      this.currentItem = item;
      this.viewDialog = true;
    },
    editItem(item) {
      this.setCurrentClearance(item);
      this.$router.push({ name: "clearance.update" });
    },
    downloadItem(item) {
      console.log(item);
    },
    categoryFormat(item) {
      if (item === 1) return "Customers";
      if (item === 2) return "Competitors";
      if (item === 3) return "Produtcts";
      if (item === 4) return "Social Media";
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
      this.items[0].count = this.badges.all;
      this.items[1].count = this.badges.verified;
    },
    addClearance() {
      this.$router.push({ name: "clearance.create" });
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
    ...mapGetters(["allClearance", "verifiedClearance", "badges"]),
  },
  created() {
    this.setBadge();
  },
  mounted() {
    this.fetchClearance();
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
