import EventService from "@/services/case/Case.js";
import * as types from "@/store/mutation-types";

export const fetchCase = ({ commit }) => {
  EventService.getCaseEvent()
    .then((response) => {
      console.log("CASE", response)
      commit(types.SET_CASE_BADGE, response.data.data.count);
      commit(types.SET_ALL_CASE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const searchCase = ({ commit }, payload) => {
  EventService.searchCaseEvent(payload)
    .then((response) => {
      commit(types.SET_RELATED_CASE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addCase = ({ commit }, payload) => {
  EventService.addCaseEvent(payload)
    .then((response) => {
      commit(types.ADD_CASE, JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export const updateCase = ({ commit }, payload) => {
  EventService.updateCaseEvent(payload)
    .then((response) => {
      commit(types.UPDATE_CASE, payload);
    })
    .catch((error) => {
      console.log(error);
    });
}



