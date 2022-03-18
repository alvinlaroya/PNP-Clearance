import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";
import Auth from "./modules/auth"
import Dashboard from "./modules/navigation/dashboard";
import Clearance from "./modules/navigation/clearance";
import Case from "./modules/navigation/case";
import Management from "./modules/navigation/management";
import Media from "./modules/overview/all_media";
import AccountSettings from "./modules/user_management/account_settings";
import ArticleNotifications from "./modules/navigation/article_notifications";
import VersionLogs from "./modules/navigation/version_logs";


const dataState = createPersistedState({
  paths: [
    'auth.auth.user',
    'auth.auth.loggedIn'
  ]
})

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      modules: {
        auth: Auth
      }
    },
    navigation: {
      namespaced: true,
      modules: {
        dashboard: Dashboard,
        clearance: Clearance,
        case: Case,
        management: Management,
      },
    },
  },
  plugins: [dataState]
});
