<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">Walbro - All Media</v-card-title>
          <v-card-subtitle
            >This table shows recently researched articles for
            Walbro</v-card-subtitle
          >
          <v-spacer></v-spacer>
          <v-btn text color="primary" style="position: absolute; right: 10px; top: 20px">
            View Older Article
          </v-btn>
          <v-toolbar flat height="90">
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark>EXPORT</v-btn>
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-row>
                    <v-col xs="3" md="5" lg="5">
                      <v-text-field
                        solo
                        flat
                        dense
                        v-model="searchVal"
                        outlined
                        @input="search"
                        label="Search"
                        append-icon="mdi-magnify"
                      ></v-text-field>
                    </v-col>
                    <v-col xs="3" md="3" lg="3">
                      <v-menu
                        v-model="dateStartMenu"
                        :close-on-content-click="false"
                        :nudge-left="20"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateStart"
                            label="Filter Date Start"
                            append-icon="mdi-calendar"
                            readonly
                            flat
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateStart"
                          @input="dateStartPick"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col xs="3" md="3" lg="3">
                      <v-menu
                        v-model="dateEndMenu"
                        :close-on-content-click="false"
                        :nudge-left="20"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateEnd"
                            label="Filter Date End"
                            append-icon="mdi-calendar"
                            readonly
                            flat
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateEnd"
                          @input="dateEndPick"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col xs="3" md="1" lg="1">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="error"
                        @click="reset"
                      >
                        <v-icon dark>
                          mdi-restart
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>

            <template v-slot:extension>
              <v-tabs v-model="tab" slider-color="blue" @change="tabChange">
                <v-tabs-slider color="blue"></v-tabs-slider>

                <v-tab v-for="(item, i) in items" :key="i">
                  <v-badge
                    color="primary"
                    :value="item.count"
                    :content="item.count"
                  >
                    {{ item.label }}
                  </v-badge>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <!--  <v-tabs-items v-model="tab">
            
            <v-tab-item v-for="(item, i) in items" :key="i">
            </v-tab-item>
          </v-tabs-items> -->
          <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="allMedia"
            :server-items-length="count"
            :items-per-page="itemsPerPage"
            :page="page"
            @pagination="paginate"
            :loading="mediaLoading"
            loading-text="Loading... Please wait"
            no-results-text="No Available Article"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" color="green" @click="editItem(item)">
                mdi-file-document-edit
              </v-icon>
              <v-icon color="blue" @click="downloadItem(item)">
                mdi-cloud-download
              </v-icon>
            </template>
            <template v-slot:item.media_date="{ item }">
              {{ dateFormat(item.media_date) }}
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ dateTimeFormat(item.createdAt) }}
            </template>
            <template v-slot:item.for_editing="{ item }">
              <v-simple-checkbox
                color="blue"
                :ripple="false"
                v-model="item.for_editing"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.published="{ item }">
              <v-simple-checkbox
                color="blue"
                :ripple="false"
                v-model="item.published"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.category="{ item }">
              {{ categoryFormat(item.category) }}
            </template>
            <template v-slot:item.title="{ item }">
              <a href="#" class="">{{ item.title }}</a>
            </template>
            <template v-slot:item.rating="{ item }">
              <v-rating
                v-model="item.rating"
                color="yellow darken-3"
                background-color="yellow darken-1"
                half-increments
                small
                dense
              ></v-rating>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("overview");

export default {
  data: () => ({
    totalArticles: 0,
    desserts: [],
    loading: true,
    options: {},
    tab: null,
    category: 0,
    itemsPerPage: 10,
    startPage: 0,
    page: 1,
    searchVal: "",
    dateStartMenu: false,
    dateStart: null,
    dateEndMenu: false,
    dateEnd: null,
    items: [
      { label: "All", count: 0 }, 
      { label: "Customers", count: 0 },
      { label: "Competitors", count: 0 } ,
      { label: "Products", count: 0 }
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
        text: "Media Date",
        value: "media_date",
      },
      { text: "Created Date & Time", value: "createdAt" },
      { text: "For Editing", value: "for_editing" },
      { text: "Published", value: "published" },
      { text: "Category", value: "category" },
      { text: "Title", value: "title", width: 250 },
      { text: "Researcher", value: "researcher" },
      { text: "Writer", value: "writer", width: 180 },
      { text: "Editor", value: "editor", width: 180 },
      { text: "Rating", value: "rating" },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    badges: {
      handler() {
        this.setBadge()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["fetchMedia"]),
    editItem(item) {
      console.log(item);
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
    paginate(obj) {
      const { itemsPerPage, pageStart, page } = obj;
      this.page = page
      this.callfetchApi(itemsPerPage, pageStart, page, this.searchVal, this.category, {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      })
    },
    search(val) {
      this.searchVal = val
      this.callfetchApi(10, 0, 1, val, this.category, {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      })
    },
    callfetchApi(itemsPerPage, pageStart, page, search, category, rangeDate) {
      this.fetchMedia({
        itemsPerPage,
        pageStart,
        page,
        search,
        category,
        rangeDate
      });
    },
    tabChange(val) {
      this.category = val;
      this.page = 1;
      this.callfetchApi(10, 0, 1, "", val, {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      })
    },
    dateStartPick() {
      this.dateEnd = null
      this.dateStartMenu = false
    },
    dateEndPick() {
      this.dateEndMenu = false
      this.callfetchApi(10, 0, 1, "", this.category, {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      })
    },
    reset() {
      this.searchVal = ""
      this.dateStart = null
      this.dateEnd = null
      this.callfetchApi(10, 0, 1, "", this.category, {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      })
    },
    setBadge() {
      this.items[0].count = this.count
      this.items[1].count = this.badges.customers
      this.items[2].count = this.badges.competitors
      this.items[3].count = this.badges.products
    }
  },
  computed: {
    ...mapGetters(["allMedia", "count", "mediaLoading", "badges"]),
  },
  created() {
    this.setBadge()
  }
};
</script>

<style></style>
