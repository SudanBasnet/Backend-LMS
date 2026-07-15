import { responseClient } from "../middleware/responseClient.js";

import { createBorrows } from "../models/BorrowHistory/BorrowHistoryModel.js";
const BOOK_DUE_DAYS = 15;
//!insert new Borrow
export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });
    console.log(req.body);
    const borrow = await createBorrows(req.body);

    return borrow.length
      ? responseClient({
          req,
          res,
          message: "borrowing book has been done successfully",
          borrow,
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
