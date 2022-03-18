<template>
  <v-card>
    <v-card-title>Welcome to Walbro Writer Dashboard</v-card-title>
    <v-card-subtitle>{{ dateAsOf() }}</v-card-subtitle>
    <v-toolbar flat>
      <v-btn color="success" dark> CREATE ARTICLE </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="currentItem" slider-color="blue">
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            :href="'#tab-' + item.label"
          >
            {{ `${item.label} (${item.count})` }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="(item, i) in items"
        :key="i"
        :value="'tab-' + item.label"
      >
        <v-card class="mx-auto ma-1" flat>
          <articles-list
            title="Customers"
            :articles="filterCustomers(item.articles)"
            :category="item.value"
          ></articles-list>
          <articles-list
            title="Competitors"
            :articles="filterCompetitors(item.articles)"
            :category="item.value"
          ></articles-list>
          <articles-list
            title="Products"
            :articles="filterProducts(item.articles)"
            :category="item.value"
          ></articles-list>
        </v-card>
        <v-divider></v-divider>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("navigation");

/* assuming article type: {
    customers: 0,
    competitors: 1,
    products: 2
} */

import ArticlesList from "./ArticlesList.vue";
export default {
  components: { ArticlesList },
  data: () => ({
    currentItem: "tab-Web",
    items: [
      {
        label: "TODAY",
        count: 18,
        value: 1,
        articles: [],
      },
      {
        label: "ADVANCE",
        count: 7,
        value: 2,
        articles: [],
      },
      {
        label: "LAST 7 DAYS",
        count: 46,
        value: 3,
        articles: [],
      },
      {
        label: "SENT BACK",
        count: 4,
        value: 4,
        articles: [],
      },
    ],
    selected: [2],
  }),

  methods: {
    dateAsOf() {
      return `Data as of ${new Date().toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    },
    filterCustomers(articles) {
      return articles.filter((article) => article.category == 1);
    },
    filterCompetitors(articles) {
      return articles.filter((article) => article.category == 2);
    },
    filterProducts(articles) {
      return articles.filter((article) => article.category == 3);
    },
  },
  computed: {
    ...mapGetters([
      "articlesToday",
      "articlesAdvance",
      "articlesLastSevenDays",
      "articlesSentBack",
    ]),
  },
  mounted() {
    this.items[0].articles = this.articlesToday.data;
    this.items[0].count = this.articlesToday.count;
    this.items[1].articles = this.articlesAdvance.data;
    this.items[1].count = this.articlesAdvance.count;
    this.items[2].articles = this.articlesLastSevenDays.data;
    this.items[2].count = this.articlesLastSevenDays.count;
    this.items[3].articles = this.articlesSentBack.data;
    this.items[3].count = this.articlesSentBack.count;
  },
};
</script>
