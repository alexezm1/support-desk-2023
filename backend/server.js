const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { userRoutes } = require("./routes/userRoutes.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const { ticketRoutes } = require("./routes/ticketRoutes.js");
const { productRoutes } = require("./routes/productRoutes.js");

const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
