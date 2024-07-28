import axios from "axios";

export default async function AddCart({ code, userId }) {
  try {
    console.log("Adding to cart with code:", code, "and userId:", userId);
    const response = await axios.post("http://localhost:4000/api/cart", {
      userId,
      code,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
  }
}
