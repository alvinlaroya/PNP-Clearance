<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Walbro - Account Settings</v-card-title>
          <v-card-subtitle>Manage account settings for Walbro</v-card-subtitle>
          <v-container fluid>
            <v-row>
              <v-col xs="12" sm="12" md="6" lg="6">
                <v-card>
                  <v-card-title>General</v-card-title>
                  <v-card-text>
                    <general-form></general-form>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col xs="12" sm="12" md="6" lg="6">
                <v-card>
                  <v-card-title>Categories</v-card-title>
                  <v-card-subtitle>
                    This settings arre category validations on submitting an
                    article for edit or pusblish.
                  </v-card-subtitle>
                  <categories-form></categories-form>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoriesForm from "../../components/user_management/account_settings/CategoriesForm.vue";
import GeneralForm from "../../components/user_management/account_settings/GeneralForm.vue";
export default {
  components: { GeneralForm, CategoriesForm },
  data: () => ({
    //
  }),
};
</script>

<style lang="postcss" scoped>
.form-input >>> .error--text {
  color: blue !important;
}
</style>
