import axios from "axios";
import { LLM_API } from "../../common/api";

export const getIndicatorsResult = () => {
  return axios
    .get(`${LLM_API.LOCAL}/ai/get-final-response`) // /${userId}
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error Get Result of LLM :", error);
    });
};
