import EventService from "@/services/management/Management.js";
import * as types from "@/store/mutation-types";

export const fetchUsers = ({ commit }) => {
  EventService.getUsersEvent()
    .then((response) => {
      commit(types.SET_USERS, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};


export const updateUser = ({ commit }, payload) => {
  EventService.updateUserEvent(payload)
    .then((response) => {
      commit(types.UPDATE_PERSONNEL, payload);
    })
    .catch((error) => {
      console.log(error);
    });
};


