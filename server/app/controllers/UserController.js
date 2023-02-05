const User = require("../models/UserModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class UserController {
  // @route Get All User
  async getUsers(req, res) {
    try {
      const users = await User.find({}).select("-password");
      res.json({
        message: "Lấy danh sách user thành công",
        success: true,
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Delete One User
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      // Check user is admin?
      const user = await User.findById(req.params.id).select("-password");
      if (user.isAdmin) {
        return res.status(400).json({
          message: "Không thể xóa admin",
          success: false,
        });
      }

      // All good, delete user

      const deletedUser = await User.findOneAndDelete({ _id: userId }).select(
        "-password"
      );

      // user not found
      if (!deletedUser) {
        return res.status(400).json({
          message: "Không tìm thấy user",
          success: false,
        });
      }
      res.json({
        message: "Xóa user thành công",
        success: true,
        user: deletedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route create user by admin
  async createUser(req, res) {
    const { username, password, confirmPassword, isAdmin } = req.body;

    // Validation
    if (!username || !password || !confirmPassword || !isAdmin) {
      return res.status(400).json({
        message: "Nhập thiếu trường dữ liệu",
        success: false,
      });
    }
    try {
      // Check for exist user
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          message: "Username đã tồn tại",
          success: false,
        });
      }

      // Check password
      if (password != confirmPassword) {
        return res.status(403).json({
          message: "Password không khớp",
          success: false,
        });
      }

      // All good, create new user
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashedPassword,
        isAdmin,
      });
      newUser.save();

      // Return token
      const accessToken = jwt.sign(
        {
          _id: newUser._id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        message: "Tạo tài khoản thành công",
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Check if user is logged in
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(400).json({
          message: "Không tìm thấy user",
          success: false,
        });
      }
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Register user
  async register(req, res) {
    const { username, password, confirmPassword } = req.body;
    const isAdmin = false;

    // Validation
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Nhập thiếu trường dữ liệu",
        success: false,
      });
    }
    try {
      // Check for exist user
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          message: "Username đã tồn tại",
          success: false,
        });
      }

      // Check password
      if (password != confirmPassword) {
        return res.status(403).json({
          message: "Password không khớp",
          success: false,
        });
      }

      // All good, create new user
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashedPassword,
        isAdmin,
      });
      newUser.save();

      // Return token
      const accessToken = jwt.sign(
        {
          _id: newUser._id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        message: "Đăng kí tài khoản thành công",
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Máy chủ không phản hồi",
        success: false,
      });
    }
  }

  // @route Login user
  async login(req, res) {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password)
      return res.status(400).json({
        message: "Nhập thiếu trường dữ liệu",
        success: false,
      });

    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (!user)
        return res.status(400).json({
          message: "Nhập sai username hoặc password",
          success: false,
        });

      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res.status(400).json({
          message: "Nhập sai username hoặc password",
          success: false,
        });

      // All good
      // Return token
      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "Đăng nhập thành công",
        accessToken,
      });
    } catch (error) {
      console.log(error),
        res.status(500).json({
          message: "Máy chủ không phản hồi",
          success: false,
        });
    }
  }
}

module.exports = new UserController();
