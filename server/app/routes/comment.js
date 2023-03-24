const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route get all comment
router.get("/", isAdmin, CommentController.getAllComment);

// @route get comment by book: /api/comment/book=121434
router.get("/book/:id", CommentController.getCommentByBook);

// @route post comment by book: /api/comment/book=121434
router.post("/book/:id", verifyToken, CommentController.createComment);

// @route update comment: /api/comment/:id
router.put("/:id", verifyToken, CommentController.updateComment);

// @route put state of comment
router.put("/state/:id", verifyToken, CommentController.updateShowComment);

// @route delete comment: /ai/comment/:id
router.delete("/:id", verifyToken, CommentController.deleteComment);

// @route delete all comment of book: /api/comment/book/:id
router.delete("/book/:id", verifyToken, CommentController.deleteCommentsOfBook);

module.exports = router;
