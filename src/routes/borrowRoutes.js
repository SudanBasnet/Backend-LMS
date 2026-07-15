import express from "express";
import { responseClient } from "../middleware/responseClient.js";

import { userAuthMiddleware } from "../middleware/authMiddleware.js";
import { insertNewBorrow } from "../controllers/borrowController.js";
import { newBorrowDataValidation } from "../middleware/Validation/borrowDataValidation.js";

const router = express.Router();
//!insert new borrow
router.post("/", userAuthMiddleware, newBorrowDataValidation, insertNewBorrow);

export default router;
