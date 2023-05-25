const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../Middleware/auth");

router.get("/", authenticateToken, DashboardController.dashboard);

module.exports = router;
