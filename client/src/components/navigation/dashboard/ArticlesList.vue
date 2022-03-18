<template>
  <div>
    <v-toolbar color="blue" height="35" dark dense flat>
      <span style="text-align: center">{{ title }}</span>
      <v-spacer></v-spacer>
      <span class="text-caption">{{ currentPage }} of {{ pages }}</span
      >&nbsp;
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="white"
            small
            v-bind="attrs"
            v-on="on"
            :disabled="currentPage <= 1"
            @click="previousPage"
          >
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>Newer</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="white"
            small
            v-bind="attrs"
            v-on="on"
            @click="nextPage"
          >
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Older</span>
      </v-tooltip>
    </v-toolbar>
    <v-card flat v-if="articles.length > 0">
      <v-list dense>
        <template v-for="(article, index) in articles">
          <v-list-item :key="index" style="margin: -10px">
            <template>
              <v-list-item-action>
                <v-btn icon color="green">
                  <v-icon medium>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="blue">
                  <v-icon medium>mdi-account-plus</v-icon>
                </v-btn>
                <v-btn icon color="red">
                  <v-icon medium>mdi-file-remove</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold blue--text"
                  v-text="article.title"
                ></v-list-item-title>
                <v-rating
                  v-model="article.rating"
                  color="yellow darken-3"
                  background-color="yellow darken-1"
                  half-increments
                  small
                  dense
                ></v-rating>
                <v-list-item-subtitle
                  >Created on
                  {{ dateTimeFormat(article.created_at) }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>{{
                  `${article.value} • Source Date ${dateFormat(
                    article.src_date
                  )}`
                }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  >Media Date
                  {{ dateTimeFormat(article.media_date) }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon color="blue">
                  <v-icon medium>mdi-comment-text</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < articles.length - 1"
            :key="index + 'divider'"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-card v-else flat class="text-center pa-3">
      <span class="text-caption">-No Articles Available-</span>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    articles: {
      type: Array,
    },
    category: {
      type: Number,
    },
  },
  data: () => ({
    pages: 15,
    currentPage: 1,
  }),
  methods: {
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
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
  },
};
</script>

<style></style>
