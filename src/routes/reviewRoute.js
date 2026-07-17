import express from "express";

import { userAuthMiddleware } from "../middleware/authMiddleware.js";

import { insertNewReviewController } from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middleware/Validation/reviewDataValidation.js";

const router = express.Router();
//!insert new review
router.post(
  "/",
  userAuthMiddleware,
  newReviewDataValidation,
  insertNewReviewController,
);
//!get all borrow
//*public

export default router;
