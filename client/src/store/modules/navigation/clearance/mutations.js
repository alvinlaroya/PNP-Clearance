import {
  SET_PENDING_CLEARANCE,
  SET_ISSUED_CLEARANCE,
  SET_ADDED_CLEARANCE,
  SET_ALL_CLEARANCE,
  SET_CLEARANCE_BADGE,
  SET_CURRENT_CLEARANCE,
  SET_APPROVED_CLEARANCE,
} from "../../../mutation-types";

export default {
  [SET_ALL_CLEARANCE](state, data) {
    state.allClearance = data;
  },
  [SET_PENDING_CLEARANCE](state, data) {
    state.pendingClearance = data;
  },
  [SET_ISSUED_CLEARANCE](state, data) {
    state.issuedClearance = data;
  },
  [SET_CLEARANCE_BADGE](state, data) {
    state.badges.all = data.pendingClearances.count;
    state.badges.verified = data.issuedClearances.count;
  },
  [SET_CURRENT_CLEARANCE](state, data) {
    state.currentClearance = data;
  },
  [SET_ADDED_CLEARANCE](state, data) {
    state.pendingClearance.push(data);
  },
  [SET_APPROVED_CLEARANCE](state, data) {
    state.pendingClearance = state.pendingClearance.filter(
      (item) => item.id != data.id
    );
    state.issuedClearance.push(data);
    state.badges.all--;
    state.badges.verified++;
  },
};
