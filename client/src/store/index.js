import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";
import Auth from "./modules/auth";
import Dashboard from "./modules/navigation/dashboard";
import Clearance from "./modules/navigation/clearance";
import Case from "./modules/navigation/case";
import Management from "./modules/navigation/management";
import Statistics from "./modules/navigation/statistics";

const dataState = createPersistedState({
  paths: ["auth.auth.user", "auth.auth.loggedIn"],
});

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      modules: {
        auth: Auth,
      },
    },
    navigation: {
      namespaced: true,
      modules: {
        dashboard: Dashboard,
        clearance: Clearance,
        case: Case,
        management: Management,
        statistics: Statistics,
      },
    },
  },
  plugins: [dataState],
});
