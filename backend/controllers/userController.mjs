import asyncHandler from "express-async-handler";
// @desc Register new user
// @route Route /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill all the required fields");
  }
  res.send("Register Route");
});

// @desc Login user
// @route Route /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Route");
});
