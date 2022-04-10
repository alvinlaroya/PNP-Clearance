import {
  SET_VERIFIED_CLEARANCE,
  SET_ADDED_CLEARANCE,
  SET_ALL_CLEARANCE,
  SET_CLEARANCE_BADGE,
  SET_CURRENT_CLEARANCE,
  SET_ISSUED_CLEARANCE_COUNT,
} from "../../../mutation-types";

export default {
  [SET_ALL_CLEARANCE](state, data) {
    state.allClearance = data;
  },
  [SET_VERIFIED_CLEARANCE](state, data) {
    state.verifiedClearance = data;
  },
  [SET_CLEARANCE_BADGE](state, data) {
    state.badges.all = data.allClearance.count;
    state.badges.verified = data.verifiedClearance.count;
  },
  [SET_CURRENT_CLEARANCE](state, data) {
    state.currentClearance = data;
  },
  [SET_ADDED_CLEARANCE](state, data) {
    state.allClearance.push(data);
  },
  [SET_ISSUED_CLEARANCE_COUNT](state, data) {
    state.issuedClearanceCount = data.allClearance.count;
  },
};
