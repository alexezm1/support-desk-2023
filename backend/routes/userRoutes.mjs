import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.mjs";

export const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  res.json({
    message: "welcome to support desk API",
  });
});

userRoutes.post("/", registerUser);

userRoutes.post("/login", loginUser);
