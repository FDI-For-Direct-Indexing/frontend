import axios from "axios";
import { API_URL } from "../../common/api";

export default async function AddCart({ code, userId }) {
  try {
    const response = await axios.delete(`${API_URL.LOCAL}/api/cart`, {
      data: [{ userId, code }],
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
  }
}
