const express = require("express");
const sensorController = require("../../controllers/api/sensorController");

const router = express.Router();

router.get("/:slug", sensorController.getAllSensors);

router.post("/:slug", sensorController.updateSensorValue);

module.exports = router;
