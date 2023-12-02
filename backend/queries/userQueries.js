// USER QUERIES
const checkUserEmail = `SELECT * FROM users AS u WHERE u.email = $1`;
const checkUserID = `SELECT * FROM users AS u WHERE u.id = $1`;
const getUsersData = `SELECT * FROM users`;
const addUser = `INSERT INTO users (name, salt, password, email, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING id, isadmin, timestamp`;

// TICKET QUERIES
const getTicketsFromDB = "SELECT * FROM tickets LIMIT 50";
const getUserTicketsFromDB = "SELECT * FROM tickets WHERE user_id = $1";
const getUserTicketFromDB = "SELECT * FROM tickets WHERE id = $1";
const createTicket =
  "INSERT INTO tickets (user_id, product, description, timestamp) VALUES ($1, $2, $3, $4) RETURNING id, user_id, timestamp";
const deleteTicketFromDB = "DELETE FROM tickets WHERE id = $1";
const updateUserTicketFromDB =
  "UPDATE tickets SET product = $1, description = $2, status = $3, updatedat = $4 WHERE id = $5 RETURNING *";

// PRODUCT QUERIES
const getProducts = "SELECT id, name FROM products";

// NOTE QUERIES
const getNotesFromTicket = "SELECT * FROM notes WHERE ticket_id = $1";
const addNoteToTicket =
  "INSERT INTO notes (user_id, ticket_id, note_text, isStaff, timestamp) VALUES($1, $2, $3, $4, $5) RETURNING *";

module.exports = {
  checkUserEmail,
  addUser,
  getUsersData,
  checkUserID,
  getTicketsFromDB,
  getUserTicketsFromDB,
  getUserTicketFromDB,
  createTicket,
  deleteTicketFromDB,
  updateUserTicketFromDB,
  getProducts,
  getNotesFromTicket,
  addNoteToTicket,
};
