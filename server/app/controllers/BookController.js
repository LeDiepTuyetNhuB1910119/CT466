const Book = require("../models/BookModel");
const Comment = require("../models/CommentModel");
require("dotenv").config();

const cloudinary = require("../utils/cloudinary");

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

  // @route books by user
  async getBooksByUser(req, res) {
    const userId = req.params.id;
    try {
      const books = await Book.find({ user: userId })
        .populate("user", ["username"])
        .populate("category", ["categoryName"]);
      res.json({
        message: "Lấy danh sách review book theo user thành công",
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

  // @route count view
  async countView(req, res) {
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

      // All good, update view
      const { title, description, category, image, view } = book;
      let viewUpdate = view + 1;
      const updatedView = await Book.findOneAndUpdate(
        { _id: bookId },
        { title, description, category, image, view: viewUpdate },
        { new: true }
      );

      if (updatedView) {
        res.json({
          message: "Cập nhật lượt xem thành công",
          success: true,
          book: updatedView,
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

  // @route create book
  async createBook(req, res) {
    const { title, description, category, image } = req.body;

    // Validation
    if (!title || !category || !image) {
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

      // All good, upload image
      if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          upload_preset: "image_book",
        });

        if (uploadRes) {
          // All good, create new book
          const newBook = new Book({
            title,
            description,
            category,
            user: req.user._id,
            image: uploadRes,
          });

          await newBook.save();

          res.json({
            message: "Tạo review thành công",
            success: true,
            book: newBook,
          });
        }
      }
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
    const { title, description, category, image } = req.body.book;
    const bookId = req.params.id;
    const newImage = req.body.image;

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
    const bookTitle = await Book.findOne({ title: title }); // lấy book theo title
    const thisBook = await Book.findOne({ title: title, _id: bookId }); // kiểm tra title có thuộc book đang xét

    if (bookTitle) {
      if (!thisBook) {
        return res.status(400).json({
          message: "Tiêu đề này đã tồn tại",
          success: false,
        });
      }
    }

    try {
      // Check exist new image
      if (newImage) {
        // xóa ảnh ban đầu
        const destroyResponse = await cloudinary.uploader.destroy(
          image.public_id
        );

        // up ảnh mới
        if (destroyResponse) {
          const uploadRes = await cloudinary.uploader.upload(newImage, {
            upload_preset: "image_book",
          });

          // update review
          if (uploadRes) {
            const updatedBook = await Book.findByIdAndUpdate(
              { _id: bookId },
              {
                title,
                description,
                category,
                image: uploadRes,
              },
              {
                new: true,
              }
            );
            res.json({
              message: "Cập nhật review thành công",
              success: true,
              book: updatedBook,
            });
          }
        }
      } else {
        let updatedBook = { title, description, category, image };
        updatedBook = await Book.findByIdAndUpdate(
          { _id: bookId },
          updatedBook,
          {
            new: true,
          }
        );

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
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route delete book
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

      if (book.image.public_id) {
        // tiến hành xóa ảnh trên cloudinary
        const destroyResponse = await cloudinary.uploader.destroy(
          book.image.public_id
        );

        // nếu đã xóa ảnh, tiến hành xóa comment của book
        if (destroyResponse) {
          const deletedComments = await Comment.deleteMany({
            book: bookId,
          });

          // comment not found
          if (deletedComments) {
            // nếu đã xóa ảnh + comment -> xóa book
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
          } else {
            return res.json({
              message: "Không thể xóa các comments của review book",
              success: false,
            });
          }
        } else {
          return res.json({
            message: "Không thể xóa ảnh review book",
            success: false,
          });
        }
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

module.exports = new BookController();
