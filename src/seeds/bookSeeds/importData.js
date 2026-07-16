//!connect Database
//!import existing models

import "dotenv/config";
import dbConnect from "../../config/dbConfig.js";
import { createManyBook, emptyBooks } from "../../models/Book/BookModel.js";
import bookData from "./book-seeds.js";

const importData = async () => {
  try {
    await dbConnect();
    await emptyBooks();
    await createManyBook(bookData);
    console.log("all the book has been imported successfully");
  } catch (error) {
    console.log(error);
  }
};

importData();
