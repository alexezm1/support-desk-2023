const bcrypt = require("bcryptjs");
const pool = require("../config/db.js");
const {
  checkUserEmails,
  addUser,
  getUsersData,
} = require("../queries/userQueries.js");

// @desc GET users
// @route Route /api/users
// @access Public
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(getUsersData);
    res.status(200).json(results.rows);
  } catch (error) {
    throw new Error("Could not get any users");
  }
};

// @desc Register new user
// @route Route /api/users
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const timestamp = new Date(Date.now()).toISOString();

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Fill all the required fields");
    }
    // Check if user already exists
    const results = await pool.query(checkUserEmails, [email]);
    if (results.rows.length) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Add user
    const user = await pool.query(addUser, [
      name,
      salt,
      hashedPassword,
      email,
      timestamp,
    ]);
    if (user) {
      res.status(201).json({
        message: "User Added Succesfullt",
        body: {
          user: { name, email },
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc Login user
// @route Route /api/users/login
// @access Public
const loginUser = async (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
