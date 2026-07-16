import { responseClient } from "../middleware/responseClient.js";
import { updateBook } from "../models/Book/BookModel.js";

import {
  createBorrows,
  getBorrowsRBAC,
} from "../models/BorrowHistory/BorrowHistoryModel.js";
const BOOK_DUE_DAYS = 15;
//!insert new Borrow
export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + BOOK_DUE_DAYS);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
        expectedAvailable: dueDate,
      };
    });
    console.log(req.body);
    const borrow = await createBorrows(req.body);
    if (borrow.length) {
      await Promise.all(
        borrow.map(({ bookId }) =>
          updateBook({
            _id: bookId,
            available: false,
            expectedAvailable: dueDate,
          }),
        ),
      );
    }

    return borrow.length
      ? responseClient({
          req,
          res,
          message: "borrowing book has been done successfully",
          payload: borrow,
        })
      : responseClient({
          req,
          res,
          message: " Unable to insert Borrow book,try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

//!get Borrows for public and admin based on role
export const getBorrowsController = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    const path = req.path;

    const isAdmin = path === "/admin";

    const borrow = isAdmin
      ? await getBorrowsRBAC() //all borrows for admin
      : await getBorrowsRBAC({ userId: _id }); //user specific

    return responseClient({
      req,
      res,
      message: "Here is all of borrow list",
      payload: borrow,
    });
  } catch (error) {
    next(error);
  }
};
