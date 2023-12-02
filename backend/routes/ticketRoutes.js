const Router = require("express");
const { protectRoutes } = require("../middleware/auth.js");
const { noteRoutes } = require("./noteRoutes.js");
const {
  getUserTickets,
  addTicket,
  getUserTicket,
  getTickets,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController.js");

const ticketRoutes = Router();

// Re-route into note Router
ticketRoutes.use("/:ticketId/notes", noteRoutes);

ticketRoutes.get("/all", getTickets);
ticketRoutes.get("/", protectRoutes, getUserTickets);
ticketRoutes.get("/:id", protectRoutes, getUserTicket);
ticketRoutes.post("/", protectRoutes, addTicket);
ticketRoutes.put("/:id", protectRoutes, updateTicket);
ticketRoutes.delete("/:id", protectRoutes, deleteTicket);

module.exports = { ticketRoutes };
