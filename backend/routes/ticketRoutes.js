const Router = require("express");
const { protectRoutes } = require("../middleware/auth.js");
const {
  getUserTickets,
  addTicket,
  getUserTicket,
  getTickets,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController.js");

const ticketRoutes = Router();

ticketRoutes.get("/all", getTickets);
ticketRoutes.get("/", protectRoutes, getUserTickets);
ticketRoutes.get("/:id", protectRoutes, getUserTicket);
ticketRoutes.post("/", protectRoutes, addTicket);
ticketRoutes.put("/:id", protectRoutes, updateTicket);
ticketRoutes.delete("/:id", protectRoutes, deleteTicket);

module.exports = { ticketRoutes };
