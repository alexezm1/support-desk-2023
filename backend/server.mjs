import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.mjs";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// User Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
