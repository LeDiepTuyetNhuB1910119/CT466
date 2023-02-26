const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    book: { type: Schema.Types.ObjectId, ref: "books" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentSchema);
