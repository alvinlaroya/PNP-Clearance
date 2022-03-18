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
            :disabled="currentPage == pages"
            @click="nextPage"
          >
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Older</span>
      </v-tooltip>
    </v-toolbar>
    <v-card flat v-if="articles.length > 0">
      <v-list dense three-line>
        <template v-for="(article, index) in articles">
          <v-list-item :key="index">
            <template>
              <v-list-item-avatar size="90" tile>
                <v-img
                  :src="article.image"
                  lazy-src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-list-item-avatar>
              <div class="article-status">
                <v-chip
                  style="font-weight: normal; font-size: 11px"
                  small
                  :color="article.status === 0 ? 'red' : 'green'"
                  text-color="white"
                  light
                >
                  {{
                    article.status == 0 ? "Danger to Use" : "Safe to Use"
                  }} </v-chip
                ><br />
                <span class="text-caption">{{ article.name }}</span>
              </div>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold blue--text">
                  <v-chip
                    class="ma-2"
                    style="font-weight: normal"
                    small
                    color="#f0d50a"
                    text-color="black"
                    light
                  >
                    <v-avatar left>
                      <v-icon small>mdi-pencil</v-icon>
                    </v-avatar>
                    For Editing
                  </v-chip>
                  {{ article.title }}
                </v-list-item-title>
                <div class="text-caption" v-html="article.desc"></div>
              </v-list-item-content>
            </template>
          </v-list-item>
          <div style="height: 30px" :key="index + 'div'"></div>
          <v-btn text :key="index + 'btn'" small color="primary" class="ma-1"
            >View Details</v-btn
          >
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
    articles: {
      type: Array,
    },
    title: {
      type: String,
    },
    pages: {
      type: Number,
    },
  },
  data: () => ({
    currentPage: 1,
  }),
  methods: {
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
};
</script>

<style scoped>
.article-status {
  position: absolute;
  top: 110px;
  left: 20px;
  text-align: center;
  width: auto;
}
</style>
