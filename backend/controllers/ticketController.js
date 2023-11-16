const pool = require("../config/db");
const AsyncHandler = require("express-async-handler");

// @desc Get current user tickets
// @route Route GET /api/tickets/
// @access Private
const getUserTickets = AsyncHandler(async (req, res) => {
  res.status(200).send({ message: "get user tickets" });
});

// @desc add ticket
// @route Route POST /api/tickets/
// @access Private
const addTicket = AsyncHandler(async (req, res) => {
  res.status(200).send({ message: "ticket created" });
});

module.exports = { getUserTickets, addTicket };
