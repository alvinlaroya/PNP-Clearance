import EventService from "@/services/auth/Register.js";
import * as types from "@/store/mutation-types";
import router from "@/router";

export const getAddresses = ({ commit }) => {
  EventService.getAddressesEvent()
    .then((response) => {
      const barangayList =
        response.data["01"].province_list["PANGASINAN"].municipality_list[
          "SISON"
        ].barangay_list;
      commit(types.SET_ADDRESSES, barangayList);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const register = (_, payload) => {
  EventService.registerEvent(payload)
    .then((response) => {
      //
    })
    .catch((error) => {
      console.log(error);
    });
};

export const forgot = async ({ commit }, payload) => {
  await EventService.forgotEvent(payload);
};

export const login = async ({ commit }, payload) => {
  await EventService.loginEvent(payload)
    .then(async (response) => {
      if (response.data == "Not verified user")
        return commit(types.SET_LOGIN_FAILED, true);
      localStorage.setItem("token", response.data.token);
      await EventService.getCurrentUser(response.data.id).then(
        async (currentResponse) => {
          commit(types.SET_AUTH_INFO, currentResponse.data.user);
        }
      );
      router.replace("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      commit(types.SET_LOGIN_FAILED, true);
    });
};

export const logOutUser = async ({ commit }) => {
  localStorage.removeItem("token");
  commit(types.LOG_OUT, {});
  router.replace("/");
};
