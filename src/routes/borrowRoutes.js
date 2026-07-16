import express from "express";
import { responseClient } from "../middleware/responseClient.js";

import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getBorrowsController,
  insertNewBorrow,
  returnBookController,
} from "../controllers/borrowController.js";
import {
  newBorrowDataValidation,
  returnBookDataValidation,
} from "../middleware/Validation/borrowDataValidation.js";

const router = express.Router();
//!insert new borrow
router.post("/", userAuthMiddleware, newBorrowDataValidation, insertNewBorrow);
//!get all borrow
//*public
router.get("/user", userAuthMiddleware, getBorrowsController);
//*admin
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getBorrowsController,
);

//* return book to the library
router.patch(
  "/",
  userAuthMiddleware,
  returnBookDataValidation,
  returnBookController,
);

export default router;
