import EventService from "@/services/clearance/Clearance.js";
import * as types from "@/store/mutation-types";

export const getClearanceIssuedStatisticReport = ({ commit }) => {
  EventService.getClearanceIssuedStatisticReportEvent()
    .then((response) => {
      console.log("ISSUED", response.data);
      commit(types.SET_CLEARANCE_ISSUED_STATISTICS, response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getClearanceIncomeStatisticReport = ({ commit }) => {
  EventService.getClearanceIncomeStatisticReportEvent()
    .then((response) => {
      console.log("INCOME", response.data);
      commit(types.SET_CLEARANCE_INCOME_STATISTICS, response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
