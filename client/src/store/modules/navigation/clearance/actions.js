import EventService from "@/services/clearance/Clearance.js";
import * as types from "@/store/mutation-types";

export const printClearance = (_, payload) => {
  const response = EventService.printClearanceEvent(payload);
  console.log(response);
};

export const fetchClearance = ({ commit }) => {
  EventService.getClearanceEvent()
    .then((response) => {
      commit(types.SET_CLEARANCE_BADGE, response.data);
      /* commit(types.SET_ALL_CLEARANCE, response.data.allClearance.rows); */
      commit(types.SET_PENDING_CLEARANCE, response.data.pendingClearances.rows);
      commit(types.SET_ISSUED_CLEARANCE, response.data.issuedClearances.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addClearance = ({ commit }, payload) => {
  EventService.addClearanceEvent(payload)
    .then((response) => {
      console.log("added", response.data.currentClearance);
      commit(types.SET_ADDED_CLEARANCE, response.data.currentClearance);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const renewClearance = ({ commit }, payload) => {
  EventService.renewClearanceEvent(payload)
    .then((response) => {
      console.log("added", response.data.currentClearance);
      commit(types.SET_ADDED_CLEARANCE, response.data.currentClearance);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const approveClearanceAction = ({ commit }, payload) => {
  EventService.approveClearanceEvent(payload)
    .then((response) => {
      commit(types.SET_APPROVED_CLEARANCE, payload);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setCurrentClearance = ({ commit }, payload) => {
  commit(types.SET_CURRENT_CLEARANCE, payload);
};

export const setCurrentClearanceToRenew = ({ commit }, payload) => {
  commit(types.SET_CURRENT_CLEARANCE_TO_RENEW, payload);
};
export const updateClearance = (_, payload) => {
  EventService.updateClearanceEvent(payload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
