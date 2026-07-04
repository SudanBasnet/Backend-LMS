import bookSchema from "./BookSchema.js";

//!inserting new book
export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//!get allbook
export const getAllPublicBooks = () => {
  return bookSchema.find({ status: "active" });
};

// //!inserting new book
export const getAllBooks = () => {
  return bookSchema.find();
};
