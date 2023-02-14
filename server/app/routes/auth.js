const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken } = require("../middleware/auth");

// Check if user is logged in: api/auth
router.get("/", verifyToken, UserController.getUser);

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
