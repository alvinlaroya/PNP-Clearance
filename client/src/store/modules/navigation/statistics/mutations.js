import {
  SET_CLEARANCE_ISSUED_STATISTICS,
  SET_CLEARANCE_INCOME_STATISTICS,
} from "../../../mutation-types";

export default {
  [SET_CLEARANCE_ISSUED_STATISTICS](state, data) {
    state.clearanceIssued = data;
  },
  [SET_CLEARANCE_INCOME_STATISTICS](state, data) {
    state.clearanceIncome = data;
  },
};
