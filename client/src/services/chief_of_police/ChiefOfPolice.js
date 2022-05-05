/* import apiClient from '../' */
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export default {
  async getPoliceEvent() {
    return await axios.get(`${apiUrl}/chiefOfPolice/getPolice`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },
  async addPoliceEvent(payload) {
    return await axios.post(`${apiUrl}/chiefOfPolice/addPolice`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async updatePoliceEvent(payload) {
    return await axios.put(
      `${apiUrl}/chiefOfPolice/updatePolice/${payload.id}`,
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
};
