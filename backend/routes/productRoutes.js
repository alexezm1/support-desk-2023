const Router = require("express");
const { getProductsData } = require("../controllers/productController");

const productRoutes = Router();

productRoutes.get("/", getProductsData);

module.exports = { productRoutes };
