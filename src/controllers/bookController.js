import { responseClient } from "../middleware/responseClient.js";
import { createNewBook } from "../models/Book/BookModel.js";

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
