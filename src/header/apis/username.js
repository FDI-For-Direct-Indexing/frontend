import axios from "axios";
import { API_URL } from "../../common/api";

export const getUsername = (userId) => {
  return axios
    .get(`${API_URL.LOCAL}/api/user/id=${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error header User: ", error);
    });
}