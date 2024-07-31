import axios from "axios";
import { API_URL } from "../../common/api";

export const getUsername = async (userId) => {
  return axios
    .get(`${API_URL.LOCAL}/api/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error at header => User: ", error);
    });
}