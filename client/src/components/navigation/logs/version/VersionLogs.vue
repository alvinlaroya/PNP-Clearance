<template>
  <v-list>
    <v-list-item-group
      active-class="green--text"
      multiple
      style="margin-top: -10px"
    >
      <v-app-bar
        absolute
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-toolbar-title class="font-weight-bold text-subtitle-1"
          >Version Logs</v-toolbar-title
        >
      </v-app-bar>
      <v-sheet id="scrolling-techniques-7" max-height="800">
        <div style="margin-top: 65px">
          <v-container fluid class="ma-0 pa-0">
            <template
              v-for="(item, index) in versions"
            >
              <v-list-group no-action :key="index">
                <template #activator>
                  <v-list-item-action v-if="currentVersion === item.version">
                    <v-icon color="yellow darken-3"> mdi-star </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      :class="[
                        'font-weight-bold black--text',
                        { 
                          'blue--text': currentVersion === item.version,
                          'white--text': $vuetify.theme.dark
                        },
                      ]"
                      >{{ item.version }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="text-caption">{{
                      dateFormat(item.created_at)
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(child, i) in item.items"
                  :key="i"
                  style="
                    border-top: 0.5px solid #eee;
                    border-bottom: 0.5px solid #eee;
                  "
                >
                  <v-list-item-content style="margin-left: -50px">
                    <v-list-item-subtitle
                      v-text="child.title"
                      class="text-truncate text-caption"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
          </v-container>
        </div>
      </v-sheet>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    currentVersion: {
      type: String,
    },
    versions: {
      type: Array,
    },
  },
  methods: {
    dateFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
};
</script>

<style scoped>
#scrolling-techniques-7 {
  overflow: hidden;
}
#scrolling-techniques-7:hover {
  overflow-y: scroll;
}
.notification-text {
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
