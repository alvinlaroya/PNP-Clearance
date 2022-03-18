<template>
  <v-card>
    <v-card-title>Article List Preview</v-card-title>
    <article-list-preview
      :articles="filterCustomers(articles)"
      :pages="1"
      title="Customers"
    ></article-list-preview>
    <article-list-preview
      :articles="filterCompetitors(articles)"
      :pages="1"
      title="Competitors"
    ></article-list-preview>
    <article-list-preview
      :articles="filterProducts(articles)"
      :pages="1"
      title="Products"
    ></article-list-preview>
  </v-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("navigation");
import ArticleListPreview from "./ArticleListPreview.vue";
export default {
  components: { ArticleListPreview },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["articles"]),
  },
  methods: {
    filterCustomers(articles) {
      return articles.filter((article) => article.category == 1);
    },
    filterCompetitors(articles) {
      return articles.filter((article) => article.category == 2);
    },
    filterProducts(articles) {
      return articles.filter((article) => article.category == 3);
    },
  }
};
</script>
