<template>
  <v-container fluid>
    <v-row v-if="loadingNotification">
      <v-col cols="12" md="4">
        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="date-picker"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="4">
        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="article, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="table-heading, list-item-two-line, image, table-tfoot"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="4">
        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          v-bind="attrs"
          class="mx-auto"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <h1>Show Notification</h1>
        <h2>Notification ID: {{ $route.params.id }}</h2>
        <pre>{{ currentNotification }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("navigation");
export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data: () => ({
    attrs: {
      class: "mb-6",
      boilerplate: false,
      elevation: 2,
    },
  }),
  computed: {
    ...mapGetters(["currentNotification", "loadingNotification"]),
  },
};
</script>

<style></style>
