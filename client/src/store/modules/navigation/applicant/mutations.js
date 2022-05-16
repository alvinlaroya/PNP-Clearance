import {
  SET_ALL_APPLICANT,
  SET_ADDED_APPLICANT,
} from "../../../mutation-types";

export default {
  [SET_ALL_APPLICANT](state, data) {
    state.allApplicant = data;
  },
  [SET_ADDED_APPLICANT](state, data) {
    state.allApplicant.unshift(data);
  },
};
