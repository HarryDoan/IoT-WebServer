const express = require("express");
const router = express.Router();
const ChartController = require("../controllers/chartController");

router.get("/", ChartController.chart);

module.exports = router;
