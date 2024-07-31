import axios from "axios";
import { API_URL } from "../../common/api";

export const signUp = (nickname) => {
  return axios
    .post(`${API_URL.LOCAL}/api/users`, { name: nickname })
    .then((response) => {
      console.log(response.data);
      return response.data._id;
    })
    .catch((error) => {
      console.log("Error Sign Up User : ", error);
    })
}
