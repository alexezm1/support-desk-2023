const express = require("express");
const { protectRoutes } = require("../middleware/auth");
const { getNotes, createNote } = require("../controllers/noteController");

const noteRoutes = express.Router({ mergeParams: true });

noteRoutes.get("/", protectRoutes, getNotes);
noteRoutes.post("/", protectRoutes, createNote);

module.exports = { noteRoutes };
