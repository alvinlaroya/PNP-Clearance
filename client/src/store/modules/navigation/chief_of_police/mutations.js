import { SET_ALL_POLICE, ADD_POLICE } from "../../../mutation-types";

export default {
  [SET_ALL_POLICE](state, data) {
    state.allPolice = data;
  },
  [ADD_POLICE](state, data) {
    state.allPolice.unshift(JSON.parse(data));
  },
};
