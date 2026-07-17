import { responseClient } from "../middleware/responseClient.js";
import { createReviews } from "../models/Review/ReviewModel.js";

const BOOK_DUE_DAYS = 15;
//!insert new Borrow
export const insertNewReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const reviewObj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
      // bookId,
      // title,
      // reviewMessage,
      // rating,
      // borrowId,
    };

    const result = await createReviews(reviewObj);

    return result._id
      ? responseClient({
          req,
          res,
          message: "Review has been recieved successfully",
        })
      : responseClient({
          req,
          res,
          message: " Unable to receive review,try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
