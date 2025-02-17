import axios from "axios";

export const API = axios.create({
  withCredentials: true,
});

export const API_URL = {
  LOCAL: process.env.REACT_APP_LOCAL_API_URL,
};

export const LLM_API = {
  LOCAL: process.env.REACT_APP_PYTHON_API_URL,
}