import axios from "axios";

export default async function GetNews(stockName) {
  const response = await axios.get(process.env.REACT_APP_LOCAL_API_URL + "/api/stocksDetail/proxy/news", {
    params: { stockName },
  });
  return response.data;
}
