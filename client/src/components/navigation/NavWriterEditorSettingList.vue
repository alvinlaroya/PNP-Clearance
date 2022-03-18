<template>
  <v-list three-line dense>
    <v-subheader>Writer/Editor</v-subheader>
    <v-list-item dense>
      <template v-slot:default="{ active }">
        <v-list-item-action>
          <v-switch
            style="padding-top: 15px"
            :input-value="active"
            v-model="autoSaveDraft"
          ></v-switch>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title style="margin-bottom: -15px"
            >Auto-Save Draft</v-list-item-title
          >
          <v-list-item-subtitle
            >(Experimental) Enable autosaving or draft</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    autoSaveDraft: false,
  }),
};
</script>
