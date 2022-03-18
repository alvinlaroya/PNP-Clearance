<template>
  <v-menu :close-on-content-click="false" offset-y max-width="300">
    <template #activator="menu">
      <v-tooltip bottom>
        <template #activator="tooltip">
          <v-btn icon v-on="{ ...menu.on, ...tooltip.on }">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
    </template>
    <v-list subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold"
            >Settings</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <nav-general-setting-list></nav-general-setting-list>
    <nav-writer-editor-setting-list></nav-writer-editor-setting-list>
  </v-menu>
</template>

<script>
import NavGeneralSettingList from "./NavGeneralSettingList.vue";
import NavWriterEditorSettingList from "./NavWriterEditorSettingList.vue";
export default {
  components: { NavGeneralSettingList, NavWriterEditorSettingList },
};
</script>
