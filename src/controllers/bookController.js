import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  deleteBook,
  findOneBook,
  getAllBooks,
  getAllPublicBooks,
  updateBook,
} from "../models/Book/BookModel.js";
import { deleteUploadedFiles } from "../middleware/Validation/fileUtil.js";
import slugify from "slugify";

//!insert new book
export const insertNewBook = async (req, res, next) => {
  try {
    if (!req.file) {
      return responseClient({
        req,
        res,
        message: "Book image is required",
        statusCode: 400,
      });
    }

    const { fName, _id } = req.userInfo;
    const { path } = req.file;
    const slug = slugify(req.body.title, { lower: true });
    const duplicateBook = await findOneBook({
      $or: [{ slug }, { isbn: req.body.isbn }],
    });

    if (duplicateBook) {
      deleteUploadedFiles(req);
      const duplicateField = duplicateBook.slug === slug ? "title" : "isbn";

      return responseClient({
        req,
        res,
        message:
          duplicateField === "title"
            ? "Book title already exists"
            : "Book ISBN already exists",
        statusCode: 400,
      });
    }

    const obj = {
      ...req.body,
      slug,

      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastupdatedby: {
        name: fName,
        adminId: _id,
      },
      imgUrl: path,
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
    deleteUploadedFiles(req);

    if (error.message.includes("E11000 duplicate key")) {
      return responseClient({
        req,
        res,
        message: " Duplicate Data detected: " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

//!update book
export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    let imageList = [];
    if (Array.isArray(req.files)) {
      imageList = [req.body.imgUrl, ...req.files.map((obj) => obj.path)];
    }

    const obj = {
      ...req.body,

      lastupdatedby: {
        name: fName,
        adminId: _id,
      },
      imageList,
    };
    const book = await updateBook(obj);
    console.log(book);
    book._id
      ? responseClient({
          req,
          res,
          message: "Book Has been updated successfully",
          payload: book,
        })
      : responseClient({
          req,
          res,
          message: " Unable to update book,try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

//!delete book
export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const book = await deleteBook(_id);
    book?._id
      ? responseClient({
          req,
          res,
          message: "Book Has been deleted successfully",
        })
      : responseClient({
          req,
          res,
          message: " Unable to delete book,try again later",
          statusCode: 404,
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
