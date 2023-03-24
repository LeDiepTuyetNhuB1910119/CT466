const Comment = require("../models/CommentModel");
const Book = require("../models/BookModel");
require("dotenv").config();

class CommentController {
  // @route get all comments
  async getAllComment(req, res) {
    try {
      const comments = await Comment.find()
        .populate("user", ["username"])
        .populate("book", ["title", "user"]);
      res.json({
        message: "Lấy danh sách comment thành công",
        success: true,
        comments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }
  // @route get book's comment
  async getCommentByBook(req, res) {
    const bookId = req.params.id;
    try {
      const comments = await Comment.find({ book: bookId })
        .populate("user", ["username"])
        .populate("book", ["title", "user"]);
      res.json({
        message: "Lấy danh sách comment theo book thành công",
        success: true,
        comments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route create comment
  async createComment(req, res) {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "Nhập thiếu trường dữ liệu",
        success: false,
      });
    }

    try {
      const newComment = new Comment({
        book: req.params.id,
        content,
        user: req.user._id,
      });

      await newComment.save();

      res.json({
        message: "Tạo comment thành công",
        success: true,
        comment: newComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route update comment
  async updateComment(req, res) {
    const { book, content } = req.body;
    const commentId = req.params.id;

    // kiểm tra có tồn tại
    const comment = await Comment.findOne({ _id: commentId }); // lấy comment
    if (!comment) {
      return res.status(400).json({
        message: "Không tìm thấy comment",
        success: false,
      });
    }

    const commentUser = comment.user.toString(); // lấy user của comment
    const idUserRequest = req.user._id; // user muốn update comment

    // nếu user k phải người post comment
    if (idUserRequest !== commentUser) {
      return res.status(400).json({
        message: "User không có quyền cập nhật",
        success: false,
      });
    }

    // Validation
    if (!content) {
      return res.status(400).json({
        message: "Chưa nhập nội dung comment",
        success: false,
      });
    }

    try {
      // All good, update comment
      let updatedComment = { book, content };

      updatedComment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        updatedComment,
        { new: true }
      );

      if (!updatedComment) {
        return res.status(400).json({
          message: "Không tìm thấy comment",
          success: false,
        });
      }
      res.json({
        message: "Cập nhật comment thành công",
        success: true,
        comment: updatedComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Update show comment
  async updateShowComment(req, res) {
    const commentId = req.params.id;
    // kiểm tra có tồn tại
    const comment = await Comment.findOne({ _id: commentId })
      .populate("user", ["_id", "username"])
      .populate("book", ["title", "user"]); // lấy comment
    if (!comment) {
      return res.status(400).json({
        message: "Không tìm thấy comment",
        success: false,
      });
    }

    const idUserRequest = req.user._id; // user muốn xóa update state comment
    const userIsAdmin = req.user.isAdmin; // kiểm tra user muốn update có là admin k
    const posterOfBook = comment.book.user.toString(); // lấy user post bài review
    try {
      if (idUserRequest === posterOfBook || userIsAdmin) {
        let { content, user, book, show } = comment;
        show = !show;

        const updatedShowComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          { content, user, book, show },
          { new: true }
        );

        if (updatedShowComment) {
          res.json({
            message: "Cập nhật trạng thái comment thành công",
            success: true,
            comment: updatedShowComment,
          });
        }
      } else {
        return res.status(400).json({
          message: "User không có quyền cập nhật trạng thái comment",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route delete one comment
  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;

      // kiểm tra có tồn tại
      const comment = await Comment.findOne({ _id: commentId })
        .populate("user", ["_id", "username"])
        .populate("book", ["title", "user"]); // lấy comment
      if (!comment) {
        return res.status(400).json({
          message: "Không tìm thấy comment",
          success: false,
        });
      }

      const commentUser = comment.user?._id.toString(); // lấy user của comment
      const idUserRequest = req.user._id; // user muốn xóa comment
      const userIsAdmin = req.user.isAdmin; // kiểm tra user muốn xóa có là admin k
      const posterOfBook = comment.book.user.toString(); // lấy user post bài review

      // console.log("user req: ", idUserRequest);
      // console.log("user cmt: ", commentUser);
      // console.log("user post: ", posterOfBook);
      // console.log("isAdmin: ", userIsAdmin);

      // check: user là ng comment? là chủ bài viết ? là admin
      if (
        idUserRequest === commentUser ||
        idUserRequest === posterOfBook ||
        userIsAdmin
      ) {
        const deletedComment = await Comment.findOneAndDelete({
          _id: commentId,
        });

        // comment not found
        if (!deletedComment) {
          return res.status(400).json({
            message: "Không tìm thấy comment",
            success: false,
          });
        }

        res.json({
          message: "Xóa comment thành công",
          success: true,
          comment: deletedComment,
        });
      } else {
        return res.status(400).json({
          message: "User không có quyền xóa",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route delete comments of book
  async deleteCommentsOfBook(req, res) {
    try {
      const bookId = req.params.id;

      // kiểm tra có tồn tại
      const comments = await Comment.find({ book: bookId })
        .populate("user", ["_id", "username"])
        .populate("book", ["title", "user"]); // lấy comment

      if (comments.length === 0) {
        return res.status(400).json({
          message: "Không tìm thấy comments",
          success: false,
        });
      }

      const idUserRequest = req.user._id; // user muốn xóa comment
      const userIsAdmin = req.user.isAdmin; // kiểm tra user muốn xóa có là admin k
      const posterOfBook = comments[0].book.user.toString(); // lấy user post bài review

      // console.log("user req: ", idUserRequest);
      // console.log("user cmt: ", commentUser);
      // console.log("user post: ", posterOfBook);
      // console.log("isAdmin: ", userIsAdmin);

      // check: user là chủ bài viết ? là admin
      if (idUserRequest === posterOfBook || userIsAdmin) {
        const deletedComments = await Comment.deleteMany({
          book: bookId,
        });

        // comment not found
        if (deletedComments) {
          res.json({
            message: "Xóa comment thành công",
            success: true,
            comments: deletedComments,
          });
        }
      } else {
        return res.status(400).json({
          message: "User không có quyền xóa",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }
}

module.exports = new CommentController();
