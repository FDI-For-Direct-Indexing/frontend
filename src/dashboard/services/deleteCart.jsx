import axios from "axios";

export default async function AddCart({ code, userId }) {
  try {
    const response = await axios.delete("http://localhost:4000/api/cart", {
      data: [{ userId, code }],
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
  }
}
