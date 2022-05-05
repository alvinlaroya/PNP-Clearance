import EventService from "@/services/chief_of_police/ChiefOfPolice.js";
import * as types from "@/store/mutation-types";

export const fetchPolice = ({ commit }) => {
  EventService.getPoliceEvent()
    .then((response) => {
      console.log("POLICE", response);
      commit(types.SET_ALL_POLICE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addPolice = ({ commit }, payload) => {
  EventService.addPoliceEvent(payload)
    .then((response) => {
      commit(types.ADD_POLICE, JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updatePolice = ({ commit }, payload) => {
  EventService.updatePoliceEvent(payload)
    .then((response) => {
      commit(types.UPDATE_CASE, payload);
    })
    .catch((error) => {
      console.log(error);
    });
};
