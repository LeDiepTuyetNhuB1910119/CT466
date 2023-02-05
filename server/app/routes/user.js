const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { isAdmin } = require("../middleware/auth");

// @route get all user
router.get("/", isAdmin, UserController.getUsers);

// @route delete user
router.delete("/:id", isAdmin, UserController.deleteUser);

module.exports = router;
