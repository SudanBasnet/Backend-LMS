import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  getAllBooks,
  getAllPublicBooks,
} from "../models/Book/BookModel.js";

//!insert new book
export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    console.log(req.userInfo);
    const obj = {
      ...req.body,

      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastupdatedby: {
        name: fName,
        adminId: _id,
      },
    };
    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "Book Has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: " Unable to add new book,try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

//! get all books for public
export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks();
    responseClient({
      req,
      res,
      payload,
      message: "Book Has been fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

//! get all books for public
export const getAllBooksController = async (req, res, next) => {
  try {
    const payload = await getAllBooks();
    responseClient({
      req,
      res,
      payload,
      message: "Book Has been fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
