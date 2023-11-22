import axios from "axios";

// Backend users endpoint
const API_URL = "/api/products";

// Get Products

export const getProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const productService = {
  getProducts,
};

export default productService;
