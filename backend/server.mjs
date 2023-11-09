import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.mjs";
import { errorHandler } from "./middleware/errorHandler.mjs";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
