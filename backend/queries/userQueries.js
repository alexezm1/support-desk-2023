const checkUserEmails = `SELECT * FROM users AS u WHERE u.email = $1`;
const getUsersData = `SELECT * FROM users`;
const addUser = `INSERT INTO users (name, salt, password, email, timestamp) VALUES ($1, $2, $3, $4, $5)`;

module.exports = { checkUserEmails, addUser, getUsersData };
