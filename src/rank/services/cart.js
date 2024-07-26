import axios from "axios";
import { API_URL } from "../../common/api";

export const getRecentCart = () => {
  return axios
    .post(`${API_URL.LOCAL}/api/cart/recent`)
    .then((response) => {
      console.log(" : ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error Get Recent Cart :", error);
    });
};
