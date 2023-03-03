const express = require("express");
const sensorController = require("../../controllers/sensorController");

const router = express.Router();

router.get("/", sensorController.getAllSensors);

router.get("/:SensorId", sensorController.getOneSensor);

// router.post("/", sensorController.createNewSensor);

router.patch("/", sensorController.updateOneSensor);

// router.delete("/:SensorId", sensorController.deleteOneSensor);

module.exports = router;
