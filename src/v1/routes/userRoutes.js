const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.post("/login", userController.checkLogin);
router.post("/register", userController.createNewUser);
router.get("/", userController.getAllUsers);

module.exports = router;
