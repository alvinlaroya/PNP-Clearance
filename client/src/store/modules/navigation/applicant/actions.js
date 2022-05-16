import EventService from "@/services/applicant/Applicant.js";
import * as types from "@/store/mutation-types";

export const fetchApplicant = ({ commit }) => {
  EventService.getApplicantsEvent()
    .then((response) => {
      console.log("APPLICANTS", response);
      commit(types.SET_ALL_APPLICANT, response.data.applicants.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addApplicant = ({ commit }, payload) => {
  EventService.addApplicantEvent(payload)
    .then((response) => {
      commit(types.SET_ADDED_APPLICANT, response.data.applicant);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateApplicant = (_, payload) => {
  EventService.updateApplicantEvent(payload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
