const pool = require("../config/db");
const AsyncHandler = require("express-async-handler");
const {
  checkUserID,
  getUserTicketsFromDB,
  createTicket,
} = require("../queries/userQueries");

// @desc Get current user tickets
// @route Route GET /api/tickets/
// @access Private
const getUserTickets = AsyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Get tickets from user
    const tickets = await pool.query(getUserTicketsFromDB, [user.rows[0].id]);
    if (tickets.rows.length > 0) {
      res.status(200).json(tickets.rows);
    } else {
      throw new Error("User has no tickets");
    }
  } catch (error) {
    throw new Error("No tickets available");
  }
});

// @desc add ticket
// @route Route POST /api/tickets/
// @access Private
const addTicket = AsyncHandler(async (req, res) => {
  try {
    const newTimeStamp = new Date(Date.now()).toISOString();
    const { product, description } = req.body;

    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (!product || !description) {
      res.status(400);
      throw new Error("Please add a product and description");
    }

    const ticket = await pool.query(createTicket, [
      user.rows[0].id,
      product,
      description,
      newTimeStamp,
    ]);

    const { id, timestamp } = ticket.rows[0];

    res
      .status(201)
      .json({
        message: "Ticket created!",
        ticket: { id, product, description, timestamp },
      });
  } catch (error) {
    throw new Error("We could not create the ticket");
  }
});

module.exports = { getUserTickets, addTicket };
