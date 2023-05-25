const express = require("express");
const router = express.Router();
const ChartController = require("../controllers/chartController");
const authenticateToken = require("../Middleware/auth");

router.get("/", authenticateToken, ChartController.chart);

module.exports = router;
