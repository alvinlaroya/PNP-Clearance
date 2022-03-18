<template>
  <div>
    <v-app-bar app dense color="#052c80" id="navbar">
      <!-- <v-app-bar-nav-icon @click="switchMiniSidebar"></v-app-bar-nav-icon> -->

      <!-- End of Navbar left actions -->
      <v-spacer></v-spacer>

      <!-- Navbar right actions -->
      <template v-if="loggedIn">
        <v-avatar :size="30">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeRBEZXpv28uJ1-BkqelP9y0Q7HkRdTXz4ZRtQatf4ZACwjpkPRrzUluJQCcoxVo_qCj8&usqp=CAU"
            alt="John"
          >
        </v-avatar>
      </template>
      <template v-else>
        <v-btn @click="$router.push({ name: 'auth.login' })"> Login </v-btn>
        <v-btn
          style="margin-left: 10px"
          @click="$router.push({ name: 'auth.register' })"
        >
          Register
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");

export default {
  data: () => ({
    selected: null,
    notification: true,
    version: "4.4.0",
    switch: false,
  }),
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapActions(["logOutUser"]),
    logout() {
      this.logOutUser();
    },
  },
};
</script>
<style lang="postcss" scoped>
/deep/ .v-text-field {
  max-width: 450px;
}
</style>
