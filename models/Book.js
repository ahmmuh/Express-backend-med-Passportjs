import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  author: { type: String, required: true },
  publisherYear: { type: Date, default: null },
  description: { type: String },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
