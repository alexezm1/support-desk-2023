const Router = require("express");
const { protectRoutes } = require("../middleware/auth.js");
const {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
} = require("../controllers/userController.js");

const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.post("/", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/me", protectRoutes, getCurrentUser);

module.exports = { userRoutes };
