import axios from "axios";
import { API_URL } from "../../common/api";

export default async function PerformBacktest(selectedItems, startDate, endDate) {
  try {
    const stockList = selectedItems.map((item) => [item.code, item.name, item.ratio / 100]);
    const requestData = {
      start_from_latest_stock: "false",
      portfolio: {
        stock_list: stockList,
        balance: 1000000,
        interval_month: 1,
        start_date: startDate.toISOString().slice(0, 10).replace(/-/g, ""),
        end_date: endDate.toISOString().slice(0, 10).replace(/-/g, ""),
      },
    };
    const response = await axios.post(API_URL.LOCAL + "/api/backtest", requestData);
    return response.data;
  } catch (error) {
    console.error("Error performing backtest", error);
    throw error;
  }
}
