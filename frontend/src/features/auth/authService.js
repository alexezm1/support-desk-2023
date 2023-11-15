import axios from "axios";

// Backend users endpoint
const API_URL = "/api/users";

// Register User

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.body.user));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
