const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../Middleware/auth");
const getTableSensorName = require("../Middleware/getTableSensorName");

router.get("/", authenticateToken, DashboardController.dashboard);

module.exports = router;
