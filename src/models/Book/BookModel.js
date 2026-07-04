import bookSchema from "./BookSchema.js";

//!inserting new book
export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
