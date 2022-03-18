<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6"
            >PNP Clearance | User Management</v-card-title
          >
          <v-card-subtitle>List of users</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6"> </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search User"
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
            :items="personnels"
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
            <template v-slot:item.verified="{ item }">
              <v-chip class="ma-2" v-if="!item.verified"> Not Verified </v-chip>
              <v-chip class="ma-2" color="success" v-else> Verified </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip class="ma-2" color="primary"> {{ role(typeof item.status == 'object' ? item.status.value : item.status )}} </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="updateDialog" width="650">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update {{ user.fname  }}
        </v-card-title>

        <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-switch
                    v-model="user.verified"
                    :label="user.verified ? `Accept ${user.fname} ${user.lname}` : `Decline ${user.fname} ${user.lname}`"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row v-if="user.verified" class="mt-0">
                <v-col cols="6">
                  <v-switch
                    v-model="user.hasUpdate"
                    :label="user.hasUpdate ? `${user.fname} can update a personnel` : `${user.fname} can't update a personnel`"
                  ></v-switch>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="user.status"
                    :items="roles"
                    item-text="label"
                    item-value="value"
                    label="Select Role"
                    return-object
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="updateDialog = false"> Close </v-btn>
          <v-btn color="success" text @click="updatePersonnel"> Save Changes </v-btn>
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
    updateDialog: false,
    snackbar: false,
    snackbarText: "",
    search: "",
    totalArticles: 0,
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
        text: "Verify",
        value: "verified",
      },
      { text: "First name", value: "fname" },
      { text: "Middle name", value: "mname" },
      { text: "Last name", value: "lname" },
      { text: "Address", value: "address" },
      { text: "Email", value: "email" },
      { text: "Position", value: "position" },
      { text: "Role", value: "status" },
    ],
    user: {},
    roles: [
      { label: "No Role", value: 0 },
      { label: "Super Admin", value: 1 },
      { label: "Admin", value: 2 },
    ]
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
    ...mapActions(["fetchUsers", "updateUser"]),
    editItem(item) {
      this.user = item
      this.updateDialog = true
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
    role(status) {
        if(status == 0) return "No Role"
        if(status == 1) return "Super Admin"
        if(status == 2) return "Admin"
    },
    updatePersonnel() {
      this.updateUser(this.user)
      this.snackbar = true
      this.snackbarText = `Personnel ${this.user.fname} Updated!`
      this.updateDialog = false
      this.user = {}
    }
  },
  computed: {
    ...mapGetters(["personnels"]),
  },
  created() {
    this.setBadge();
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style></style>
