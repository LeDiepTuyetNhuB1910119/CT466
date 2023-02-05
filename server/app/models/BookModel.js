const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    category: { type: Schema.Types.ObjectId, ref: "categories" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", BookSchema);
