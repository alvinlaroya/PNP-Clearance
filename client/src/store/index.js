import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";
import Auth from "./modules/auth";
import Dashboard from "./modules/navigation/dashboard";
import Clearance from "./modules/navigation/clearance";
import Case from "./modules/navigation/case";
import ChiefOfPolice from "./modules/navigation/chief_of_police";
import Management from "./modules/navigation/management";
import Statistics from "./modules/navigation/statistics";
import Applicant from "./modules/navigation/applicant";

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
        chiefOfPolice: ChiefOfPolice,
        applicant: Applicant,
      },
    },
  },
  plugins: [dataState],
});
