const Router = require("express");
const { protectRoutes } = require("../middleware/auth.js");
const {
  getUserTickets,
  addTicket,
} = require("../controllers/ticketController.js");

const ticketRoutes = Router();

// ticketRoutes.get("/", getTickets);
ticketRoutes.get("/", protectRoutes, getUserTickets);
// ticketRoutes.get("/:id", getTicket);
ticketRoutes.post("/", protectRoutes, addTicket);
// ticketRoutes.put("/:id", protectRoutes, updateTicket);
// ticketRoutes.delete("/:id", protectRoutes, deleteTicket);

module.exports = { ticketRoutes };