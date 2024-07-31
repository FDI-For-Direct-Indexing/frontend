import axios from "axios";
import { API_URL } from "../../common/api";

export default async function AddCart({ code, userId }) {
  try {
    const response = await axios.post(`${API_URL.LOCAL}/api/cart`, {
      userId,
      code,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
  }
}
