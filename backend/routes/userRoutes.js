const Router = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController.js");

const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.post("/", registerUser);

userRoutes.post("/login", loginUser);

module.exports = { userRoutes };
