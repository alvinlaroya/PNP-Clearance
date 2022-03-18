import * as types from "@/store/mutation-types";

export const showNotification = ({ commit, state }, payload) => {
  commit(types.SET_LOADING_NOTIFICATION, true);
  let current = state.notifications.find(({ id }) => id === payload);
  commit(types.SET_CURRENT_NOTIFICATION, current);
  if (current) current.isOpen = true;
  setTimeout(() => {
    commit(types.SET_LOADING_NOTIFICATION, false);
  }, 1000)
};
