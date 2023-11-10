const checkUserEmails = `SELECT * FROM users AS u WHERE u.email = $1`;
const getUsersData = `SELECT * FROM users`;
const addUser = `INSERT INTO users (name, salt, password, email, timestamp, date) VALUES ($1, $2, $3, $4, $5, to_timestamp(${Date.now()} / 1000.0))`;

module.exports = { checkUserEmails, addUser, getUsersData };
