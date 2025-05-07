import {
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/BookController.js";

import express from "express";

const bookRoute = express.Router();

bookRoute.get("/books/:bookId", getBook);
bookRoute.patch("/books/:bookId", updateBook);
bookRoute.delete("/books/:bookId", deleteBook);
bookRoute.get("/books", getBooks);

export default bookRoute;
