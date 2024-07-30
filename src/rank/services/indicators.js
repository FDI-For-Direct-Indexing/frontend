import axios from "axios";
import { LLM_API } from "../../common/api";

export const getIndicatorsResult = (userId) => {
  return axios
    .get(`${LLM_API.LOCAL}/api/ai/execute-completion/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error Get Result of LLM :", error);
    });
};
