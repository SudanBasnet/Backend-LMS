import express from "express";

import { userAuthMiddleware } from "../middleware/authMiddleware.js";

import {
  getAllreviewsController,
  insertNewReviewController,
} from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middleware/Validation/reviewDataValidation.js";

const router = express.Router();
//!insert new review
router.post(
  "/",
  userAuthMiddleware,
  newReviewDataValidation,
  insertNewReviewController,
);
//!get all reviews for admin and public
router.get("/admin", userAuthMiddleware, getAllreviewsController);
router.get("/", getAllreviewsController);
//!get all borrow
//*public

export default router;
