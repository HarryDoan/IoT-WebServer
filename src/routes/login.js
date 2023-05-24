const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController.js");

router.get("/", LoginController.index);

module.exports = router;
