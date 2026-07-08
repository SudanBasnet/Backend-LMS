import bookSchema from "./BookSchema.js";

//!inserting new book
export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//!find one book
export const findOneBook = (filter) => {
  return bookSchema.findOne(filter);
};

//!get allbook
export const getAllPublicBooks = () => {
  return bookSchema.find({ status: "active" });
};

// //!inserting new book
export const getAllBooks = () => {
  return bookSchema.find();
};

//!update new book
export const updateBook = ({ _id, ...rest }) => {
  return bookSchema.findByIdAndUpdate(_id, rest);
};

//!delete book
export const deleteBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
