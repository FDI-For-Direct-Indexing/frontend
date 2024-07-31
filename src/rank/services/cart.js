import axios from "axios";
import { API_URL } from "../../common/api";

export const getRecentCart = (userId) => {
  return axios
    .get(`${API_URL.LOCAL}/api/cart/${userId}/recent`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error Get Recent Cart :", error);
    });
};
