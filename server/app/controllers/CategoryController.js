const Category = require("../models/CategoryModel");
const Book = require("../models/BookModel");
require("dotenv").config();

class CategoryController {
  // @route Get all Category
  async getCategories(req, res) {
    try {
      const categories = await Category.find({});
      res.json({
        message: "Lấy danh sách category thành công",
        success: true,
        categories,
      });
    } catch (error) {
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Create category
  async createCategory(req, res) {
    const { categoryName } = req.body;

    // Validation
    if (!categoryName) {
      return res.status(400).json({
        message: "Chưa nhập tên thể loại",
        success: false,
      });
    }

    try {
      // Check for exist category
      const category = await Category.findOne({ categoryName });
      if (category) {
        return res.status(400).json({
          message: "Thể loại này đã tồn tại",
          success: false,
        });
      }

      // All good, create new category
      const newCategory = new Category({
        categoryName,
      });

      await newCategory.save();

      res.json({
        message: "Tạo thể loại thành công",
        success: true,
        category: newCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Update category
  async updateCategory(req, res) {
    const { categoryName } = req.body;

    // Validation
    if (!categoryName) {
      return res.status(400).json({
        message: "Chưa nhập tên thể loại",
        success: false,
      });
    }
    try {
      // Check for exist category
      const category = await Category.findOne({ categoryName });
      if (category) {
        return res.status(400).json({
          message: "Thể loại này đã tồn tại",
          success: false,
        });
      }

      // All good, update category
      let updatedCategory = { categoryName };
      const categoryId = req.params.id;

      updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        updatedCategory,
        { new: true }
      );

      // category not found
      if (!updatedCategory) {
        return res.status(400).json({
          message: "Không tìm thấy thể loại",
          success: false,
        });
      }
      res.json({
        message: "Cập nhật thể loại thành công",
        success: true,
        category: updatedCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Delete category
  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;

      // check books have that category
      const books = await Book.find({ category: categoryId });
      //console.log(books.length);
      if (books.length !== 0) {
        return res.status(400).json({
          message: "Vui lòng xóa các review thuộc thể loại này",
          success: false,
        });
      }
      const deletedCategory = await Category.findOneAndDelete({
        _id: categoryId,
      });

      // category not found
      if (!deletedCategory) {
        return res.status(400).json({
          message: "Không tìm thấy thể loại",
          success: false,
        });
      }
      res.json({
        message: "Xóa thể loại thành công",
        success: true,
        category: deletedCategory,
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

module.exports = new CategoryController();
