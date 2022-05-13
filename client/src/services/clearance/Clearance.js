/* import apiClient from '../' */
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export default {
  async printClearanceEvent(payload) {
    return await axios.post(`${apiUrl}/clearance/printClearance`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async getClearanceEvent() {
    return await axios.get(`${apiUrl}/clearance/getClearances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async getAllPendingClearanceEvent() {
    return await axios.get(`${apiUrl}/clearance/getPendingClearances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async getAllIssuedClearanceEvent() {
    return await axios.get(`${apiUrl}/clearance/getIssuedClearances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async addClearanceEvent(payload) {
    return await axios.post(`${apiUrl}/clearance/addClearance`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async renewClearanceEvent(payload) {
    return await axios.post(`${apiUrl}/clearance/renewClearance`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async approveClearanceEvent(payload) {
    await axios.put(
      `${apiUrl}/clearance/approveClearance/${payload.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },

  async updateClearanceEvent(payload) {
    return await axios.put(
      `${apiUrl}/clearance/updateClearance/${payload.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },

  async getClearanceIssuedStatisticReportEvent() {
    return await axios.get(
      `${apiUrl}/clearance/getClearanceIssuedStatisticalReport`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },

  async getClearanceIncomeStatisticReportEvent() {
    return await axios.get(
      `${apiUrl}/clearance/getClearanceIncomeStatisticalReport`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },
};
