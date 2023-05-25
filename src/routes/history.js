const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController");
const authenticateToken = require("../Middleware/auth");

router.get("/", authenticateToken, HistoryController.index);

module.exports = router;
