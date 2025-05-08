import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/BookController.js";

import express from "express";

const bookRoute = express.Router();

bookRoute.get("/books/:bookId", isAuthenticated, getBook);
bookRoute.patch("/books/:bookId", isAuthenticated, updateBook);
bookRoute.delete("/books/:bookId", isAuthenticated, deleteBook);
bookRoute.get("/books", isAuthenticated, getBooks);

export default bookRoute;
