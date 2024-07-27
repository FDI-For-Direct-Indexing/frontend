import axios from "axios";

export default async function GetNews(stockName) {
  const response = await axios.get("http://localhost:4000/api/stocksDetail/proxy/news", {
    params: { stockName },
  });
  console.log(response.data);
  return response.data;
}
