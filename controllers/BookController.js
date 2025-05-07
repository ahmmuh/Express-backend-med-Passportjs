import Book from "../models/Book.js";

//New book

export const AddBook = async (req, res) => {
  const { bookTitle, author, publisherYear, description } = req.body;
  if (!bookTitle | !author | !publisherYear | !description) {
    return req.status(400).json({ message: "Alla fält måste fyllas i" });
  }
  try {
    const newBook = new Book({ bookTitle, author, publisherYear, description });
    await newBook.save();
    return res.status(201).json({ message: "En ny book har lagts till" });
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

//Book lista
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: "Det finns inga böcker" });
    }
    console.log("Books", books);
    return res.status(200).json({ book1: "Love", book2: "War" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server fel" });
  }
};

export const getBook = async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res
      .status(400)
      .json({ message: "Det finns inga book med detta ID" });
  }
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).json({ message: "Denna book finns ej" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res
      .status(400)
      .json({ message: "Det finns inga book med detta ID" });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body);
    return res
      .status(200)
      .json({ message: "Book har uppdaterats", book: updatedBook });
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res
      .status(400)
      .json({ message: "Det finns inga book med detta ID" });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return res
      .status(200)
      .json({ message: "Book har tagits bort", book: deletedBook });
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};
