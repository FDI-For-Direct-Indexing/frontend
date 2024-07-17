import axios from "axios";
import { API_URL } from "../../main/apis/core";

export const getSearchResult = (name) => {
  return axios
    .get(`${API_URL.LOCAL}/api/corporates/search?keyword=${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error searching stock data:", error);
    });
};

export const getIncludedSearchResult = (name) => {
  return axios
    .get(`${API_URL.LOCAL}/api/corporates/include?keyword=${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error searching stock data:", error);
    });
};