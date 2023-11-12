const express = require("express");
const switchController = require("../../controllers/api/switchController");

const router = express.Router();

router.get("/:slug", switchController.getAllSwitches);

router.post("/:slug", switchController.updateSwitchValue);

module.exports = router;
