const bcrypt = require("bcryptjs");
const pool = require("../config/db.js");
const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  checkUserEmail,
  addUser,
  getUsersData,
} = require("../queries/userQueries.js");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc GET users
// @route Route /api/users
// @access Public
const getUsers = AsyncHandler(async (req, res) => {
  try {
    const results = await pool.query(getUsersData);
    res.status(200).json(results.rows);
  } catch (error) {
    throw new Error("Could not get any users");
  }
});

// @desc Register new user
// @route Route /api/users
// @access Public
const registerUser = AsyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const timestamp = new Date(Date.now()).toISOString();

    // Check if form data is empty
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Fill all the required fields");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords must match");
    }

    // Check if user already exists
    const results = await pool.query(checkUserEmail, [email]);
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
        message: "User Added Succesfully",
        body: {
          user: { name, email },
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// @desc Login user
// @route Route /api/users/login
// @access Public
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(checkUserEmail, [email]);
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

  // Check user and passwords match
  if (user.rows.length && passwordMatch) {
    res.status(200).json({
      message: "Login Successfull",
      body: {
        user: {
          name: user.rows[0].name,
          email: user.rows[0].email,
          token: generateToken(user.rows[0].id),
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Get current user
// @route Route /api/users/me
// @access Private
const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = {
    id: req.user.rows[0].id,
    name: req.user.rows[0].name,
    email: req.user.rows[0].email,
  };
  res.status(200).send(user);
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
};
