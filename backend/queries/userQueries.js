// USER QUERIES
const checkUserEmail = `SELECT * FROM users AS u WHERE u.email = $1`;
const checkUserID = `SELECT * FROM users AS u WHERE u.id = $1`;
const getUsersData = `SELECT * FROM users`;
const addUser = `INSERT INTO users (name, salt, password, email, timestamp) VALUES ($1, $2, $3, $4, $5)`;

// TICKET QUERIES
const getUserTicketsFromDB = "SELECT * FROM tickets WHERE id = $1";
const createTicket =
  "INSERT INTO tickets (user_id, product, description, timestamp) VALUES ($1, $2, $3, $4)";

// PRODUCT QUERIES
const getProducts = "SELECT id, name FROM products";
const createProduct = "";

module.exports = {
  checkUserEmail,
  addUser,
  getUsersData,
  checkUserID,
  getUserTicketsFromDB,
  createTicket,
  getProducts,
};
