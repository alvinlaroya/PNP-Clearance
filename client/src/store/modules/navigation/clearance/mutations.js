import {
  SET_PENDING_CLEARANCE,
  SET_ISSUED_CLEARANCE,
  SET_ADDED_CLEARANCE,
  SET_ALL_CLEARANCE,
  SET_CLEARANCE_BADGE,
  SET_CURRENT_CLEARANCE,
  SET_CURRENT_CLEARANCE_TO_RENEW,
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
  [SET_CURRENT_CLEARANCE_TO_RENEW](state, data) {
    data.issuedOn = "";
    state.currentClearanceRenew = data;
  },
  [SET_ADDED_CLEARANCE](state, data) {
    state.pendingClearance.unshift(data);
  },
  [SET_APPROVED_CLEARANCE](state, data) {
    state.pendingClearance = state.pendingClearance.filter(
      (item) => item.id != data.id
    );
    state.issuedClearance.unshift(data);
    state.badges.all--;
    state.badges.verified++;
  },
};
