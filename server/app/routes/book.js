const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @ route get all review book
router.get("/", BookController.getBooks);

// @ route get one review book
router.get("/:id", BookController.getOneBook);

// @ route get all review book by category
router.get("/category/:id", BookController.getBooksByCategory);

// @route create review book: /api/books/
router.post("/", verifyToken, BookController.createBook);

// @route update review book: /api/books/:id
router.put("/:id", verifyToken, BookController.updateBook);

// @route delete review book: /api/books/:id
router.delete("/:id", verifyToken, BookController.deleteBook);

module.exports = router;
