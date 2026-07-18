import { responseClient } from "../middleware/responseClient.js";
import { updateBorrow } from "../models/BorrowHistory/BorrowHistoryModel.js";

import {
  createReviews,
  getReviews,
  updateReview,
} from "../models/Review/ReviewModel.js";

const BOOK_DUE_DAYS = 15;
//!insert new Borrow
export const insertNewReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const { borrowId } = req.body;
    const reviewObj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
    };

    const result = await createReviews(reviewObj);
    if (result?._id) {
      //update borrow table with review id result._id
      const reviewId = result._id;
      const updateResult = await updateBorrow({ _id: borrowId }, { reviewId });
      if (updateResult?._id) {
        return responseClient({
          req,
          res,
          message: "Review has been received successfully",
        });
      }
    }
    responseClient({
      req,
      res,
      message: " Something went wrong, Please contact administrator",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

//!get all reviews controller

export const getAllreviewsController = async (req, res, next) => {
  try {
    const filter = {};

    if (req?.userInfo?.role !== "admin") {
      filter.isApproved = true;
    }
    const payload = await getReviews(filter);
    responseClient({
      req,
      res,
      payload,
      message: "Here are the reviews",
    });
  } catch (error) {
    next(error);
  }
};

//!update review status

export const updateReviewStatusController = async (req, res, next) => {
  try {
    const { _id, isApproved } = req.body;

    if (!_id || typeof isApproved !== "boolean") {
      return responseClient({
        req,
        res,
        statusCode: 400,
        message: "Review ID and approval status are required",
      });
    }

    const result = await updateReview(
      _id,
      { isApproved },
      { new: true, runValidators: true },
    );

    return result?._id
      ? responseClient({
          req,
          res,
          payload: result,
          message: isApproved
            ? "The review has been approved"
            : "The review has been unapproved",
        })
      : responseClient({
          req,
          res,
          statusCode: 404,
          message: "Review not found",
        });
  } catch (error) {
    next(error);
  }
};
