const Book = require("../models/BookModel");
require("dotenv").config();

class BookController {
  // @route get all book
  async getBooks(req, res) {
    try {
      const books = await Book.find()
        .populate("user", ["username"])
        .populate("category", ["categoryName"]);
      res.json({
        message: "Lấy danh sách review book thành công",
        success: true,
        books,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route books by category
  async getBooksByCategory(req, res) {
    const categoryId = req.params.id;
    try {
      const books = await Book.find({ category: categoryId })
        .populate("user", ["username"])
        .populate("category", ["categoryName"]);
      res.json({
        message: "Lấy danh sách review book theo category thành công",
        success: true,
        books,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route one book
  async getOneBook(req, res) {
    const bookId = req.params.id;

    try {
      const book = await Book.findOne({ _id: bookId })
        .populate("user", ["username"])
        .populate("category", ["categoryName"]);

      if (!book) {
        return res.status(400).json({
          message: "Không tìm thấy bài review",
          success: false,
        });
      }
      res.json({
        message: "Lấy review thành công",
        success: true,
        book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route create book
  async createBook(req, res) {
    const { title, description, category } = req.body;

    // Validation
    if (!title || !category) {
      return res.status(400).json({
        message: "Nhập thiếu trường dữ liệu",
        success: false,
      });
    }

    try {
      // Check for exist book
      const book = await Book.findOne({ title });
      if (book) {
        return res.status(400).json({
          message: "Title này đã tồn tại",
          success: false,
        });
      }

      // All good, create new book
      const newBook = new Book({
        title,
        description,
        category,
        user: req.user._id,
      });

      await newBook.save();

      res.json({
        message: "Tạo review thành công",
        success: true,
        book: newBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route update book
  async updateBook(req, res) {
    const { title, description, category } = req.body;
    const bookId = req.params.id;

    // kiểm tra có tồn tại
    const book = await Book.findOne({ _id: bookId }); // lấy book
    if (!book) {
      return res.status(400).json({
        message: "Không tìm thấy review book",
        success: false,
      });
    }

    const bookUser = book.user.toString(); // lấy user của book
    const idUserRequest = req.user._id; // user muốn update book
    const userIsAdmin = req.user.isAdmin; // kiểm tra user muốn update có là admin k

    // nếu user k phải người post book và k phải admin
    if (idUserRequest !== bookUser && !userIsAdmin) {
      return res.status(400).json({
        message: "User không có quyền cập nhật",
        success: false,
      });
    }

    // Validation
    if (!title) {
      return res.status(400).json({
        message: "Chưa nhập tên bài review",
        success: false,
      });
    }

    // kiểm tra trùng title
    const bookTitle = await Book.findOne({ title: title }); // lấy book
    if (bookTitle) {
      return res.status(400).json({
        message: "Tiêu đề này đã tồn tại",
        success: false,
      });
    }
    try {
      // All good, update book
      let updatedBook = { title, description, category };
      updatedBook = await Book.findByIdAndUpdate({ _id: bookId }, updatedBook, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(400).json({
          message: "Không tìm thấy bài review",
          success: false,
        });
      }
      res.json({
        message: "Cập nhật review thành công",
        success: true,
        book: updatedBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // // @route delete book
  async deleteBook(req, res) {
    try {
      const bookId = req.params.id;

      // kiểm tra có tồn tại
      const book = await Book.findOne({ _id: bookId }); // lấy book
      if (!book) {
        return res.status(400).json({
          message: "Không tìm thấy review book",
          success: false,
        });
      }

      const bookUser = book.user.toString(); // lấy user của book
      const idUserRequest = req.user._id; // user muốn xóa book
      const userIsAdmin = req.user.isAdmin; // kiểm tra user muốn xóa có là admin k

      // console.log("userRequest", idUserRequest);
      // console.log("userIsAdmin", userIsAdmin);
      // console.log("bookUser", bookUser);
      // console.log("so sánh: ", idUserRequest == bookUser);

      // nếu user k phải người post book và k phải admin
      if (idUserRequest !== bookUser && !userIsAdmin) {
        return res.status(400).json({
          message: "User không có quyền xóa",
          success: false,
        });
      }

      const deletedBook = await Book.findOneAndDelete({ _id: bookId });

      // book not found
      if (!deletedBook) {
        return res.status(400).json({
          message: "Không tìm thấy review book",
          success: false,
        });
      }

      res.json({
        message: "Xóa bài review book thành công",
        success: true,
        book: deletedBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }
}

module.exports = new BookController();
