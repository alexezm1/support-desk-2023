const pool = require("../config/db");
const AsyncHandler = require("express-async-handler");
const {
  getUserTicketFromDB,
  getNotesFromTicket,
  checkUserID,
  addNoteToTicket,
} = require("../queries/userQueries");

// @desc Get notes for a ticket
// @route Route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = AsyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Get tickets from user
    const ticket = await pool.query(getUserTicketFromDB, [req.params.ticketId]);

    if (ticket.rows[0].user_id !== req.user.rows[0].id) {
      throw new Error("Not Authorized");
    }

    const notes = await pool.query(getNotesFromTicket, [ticket.rows[0].id]);
    res.status(200).json({ message: "Notes Available", notes: notes.rows });
  } catch (error) {
    throw new Error("Could not fetch notes for this ticket");
  }
});

// @desc Add note
// @route Route POST /api/tickets/:ticketId/notes
// @access Private
const createNote = AsyncHandler(async (req, res) => {
  try {
    const newTimeStamp = new Date(Date.now()).toISOString();
    // Get user using the id in the JWT
    const user = await pool.query(checkUserID, [req.user.rows[0].id]);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Get tickets from user
    const ticket = await pool.query(getUserTicketFromDB, [req.params.ticketId]);

    if (ticket.rows[0].user_id !== req.user.rows[0].id) {
      throw new Error("Not Authorized");
    }

    const queryData = [
      user.rows[0].id,
      ticket.rows[0].id,
      req.body.note_text,
      false,
      newTimeStamp,
    ];

    const note = await pool.query(addNoteToTicket, queryData);

    res.status(200).json({ message: "Note Created", note: note.rows[0] });
  } catch (error) {
    throw new Error("Could not fetch notes for this ticket");
  }
});

module.exports = { getNotes, createNote };
