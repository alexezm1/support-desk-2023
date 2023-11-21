const pool = require("../config/db");
const AsyncHandler = require("express-async-handler");
const {
  checkUserID,
  getUserTicketsFromDB,
  createTicket,
  getUserTicketFromDB,
  getTicketsFromDB,
  deleteTicketFromDB,
  updateUserTicketFromDB,
} = require("../queries/userQueries");

// @desc Get tickets
// @route Route GET /api/tickets/all
// @access Public
const getTickets = AsyncHandler(async (req, res) => {
  try {
    // Get tickets
    const tickets = await pool.query(getTicketsFromDB);
    res.status(200).json(tickets.rows);
  } catch (error) {
    throw new Error("No tickets available");
  }
});

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

// @desc Get current user ticket
// @route Route GET /api/tickets/:id
// @access Private
const getUserTicket = AsyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Get single ticket from user
    const ticket = await pool.query(getUserTicketFromDB, [req.params.id]);

    // Check if user is viewing his own tickets
    if (ticket.rows[0].user_id !== req.user.rows[0].id) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    if (ticket.rows.length > 0) {
      res.status(200).json(ticket.rows);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    throw new Error(error);
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

    res.status(201).json({
      message: "Ticket created!",
      ticket: { id, product, description, timestamp },
    });
  } catch (error) {
    throw new Error("We could not create the ticket");
  }
});

// @desc Delete user ticket
// @route Route DELETE /api/tickets/:id
// @access Private
const deleteTicket = AsyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Get single ticket from user
    const ticket = await pool.query(getUserTicketFromDB, [req.params.id]);

    // Check if user is viewing his own tickets
    if (ticket.rows[0].user_id !== req.user.rows[0].id) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    if (ticket.rows.length > 0) {
      await pool.query(deleteTicketFromDB, [req.params.id]);
      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    throw new Error("Could not delete ticket");
  }
});

// @desc Update user ticket
// @route Route PUT /api/tickets/:id
// @access Private
const updateTicket = AsyncHandler(async (req, res) => {
  try {
    const updatedTimeStamp = new Date(Date.now()).toISOString();
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

    const updatedTicket = await pool.query(updateUserTicketFromDB, [
      product,
      description,
      updatedTimeStamp,
      req.params.id,
    ]);

    const { id, updatedat } = updatedTicket.rows[0];

    res.status(201).json({
      message: "Ticket updated!",
      ticket: { id, product, description, updatedat },
    });
  } catch (error) {
    throw new Error("We could not create the ticket");
  }
});

module.exports = {
  getTickets,
  getUserTickets,
  getUserTicket,
  addTicket,
  deleteTicket,
  updateTicket,
};
