import axios from "axios";
import { API_URL } from "../../common/api";

export default async function GetNews(stockName) {
  const response = await axios.get(`${API_URL.LOCAL}/api/stocksDetail/proxy/news`, {
    params: { stockName },
  });
  console.log(response.data);
  return response.data;
}
