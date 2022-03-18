<template>
  <v-list flat subheader three-line dense>
    <v-subheader>General</v-subheader>
    <v-list-item>
      <template v-slot:default="{ active }">
        <v-list-item-action>
          <v-switch
            style="padding-top: 15px"
            :input-value="active"
            v-model="pushNotification"
          ></v-switch>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title style="margin-bottom: -15px"
            >Push Notifications</v-list-item-title
          >
          <v-list-item-subtitle
            >Enable/disable web push notifications</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>
    </v-list-item>

    <v-list-item>
      <template v-slot:default="{ active }">
        <v-list-item-action>
          <v-switch
            style="padding-top: 15px"
            :input-value="active"
            v-model="$vuetify.theme.dark"
          ></v-switch>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title style="margin-bottom: -15px"
            >Dark Mode</v-list-item-title
          >
          <v-list-item-subtitle
            >Enable dark mode theme (only applicable to internal
            webpages).</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    pushNotification: true,
    darkMode: false,
  }),
};
</script>
