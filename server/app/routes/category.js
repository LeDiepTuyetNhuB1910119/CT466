const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { isAdmin } = require("../middleware/auth");

// @route get all: /api/categories/
router.get("/", CategoryController.getCategories);

// @route post: /api/categories/
router.post("/", isAdmin, CategoryController.createCategory);

// @route put: /api/categories/:id
router.put("/:id", isAdmin, CategoryController.updateCategory);

// @route delete: /api/categories/:id
router.delete("/:id", isAdmin, CategoryController.deleteCategory);

module.exports = router;
