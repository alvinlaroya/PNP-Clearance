<template>
  <v-list>
    <v-list-item-group active-class="blue--text" style="margin-top: -10px">
      <v-app-bar
        absolute
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-toolbar-title class="font-weight-bold text-subtitle-1"
          >Notifications</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-filter-menu</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>All Notifications</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Unread Notifications</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-7" max-height="800" class="scroll">
        <div style="margin-top: 55px">
          <v-container fluid class="ma-0 pa-0">
            <template
              v-for="(item, index) in articles"
            >
              <v-list-item :key="item.title" @click="clickNotification(item)">
                <template>
                  <v-list-item-avatar>
                    <v-icon
                      :class="[
                        {
                          purple: item.type === 1,
                          red: item.type === 2,
                          blue: item.type === 3,
                        },
                      ]"
                      dark
                    >
                      {{ notifIcon(item.type) }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div
                      :class="[
                        'text-caption',
                        'notification-text',
                        {
                          'black--text': !item.isOpen,
                          'grey--text': item.isOpen,
                          'white--text': $vuetify.theme.dark
                        },
                      ]"
                      v-html="item.content"
                    ></div>

                    <v-list-item-subtitle
                      :class="[
                        'text-caption',
                        {
                          'blue--text': !item.isOpen,
                          'font-weight-bold': !item.isOpen,
                        },
                      ]"
                    >
                      <time-ago
                        :datetime="dateTimeFormat(item.created_at)"
                        refresh
                        locale="en"
                        :tooltip="true"
                        :long="true"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon color="blue darken-3" x-small v-show="!item.isOpen">
                      mdi-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < articles.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-container>
        </div>
      </v-sheet>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("navigation");
import { TimeAgo } from "vue2-timeago";
export default {
  components: {
    TimeAgo,
  },
  props: {
    articles: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(["showNotification"]),
    notifIcon(type) {
      if (type === 1) return "mdi-comment-quote";
      if (type === 2) return "mdi-file-remove";
      if (type === 3) return "mdi-comment-text-multiple";
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
    clickNotification(notification) {
      this.showNotification(notification.id)
      this.$router.push({ name: 'notification.show', params: { id: notification.id } })
    }
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
