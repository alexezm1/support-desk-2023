const pool = require("../config/db");
const AsyncHandler = require("express-async-handler");
const { getProducts } = require("../queries/userQueries");

// @desc Get products
// @route Route GET /api/products/
// @access Public
const getProductsData = AsyncHandler(async (req, res) => {
  try {
    // Get products
    const products = await pool.query(getProducts);
    res.status(200).json(products.rows);
  } catch (error) {
    throw new Error("No products available");
  }
});

module.exports = { getProductsData };
