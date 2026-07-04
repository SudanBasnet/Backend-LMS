import express from "express";
import {
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import { newBookDataValidation } from "../middleware/Validation/bookDataValidation.js";
const router = express.Router();
//!public get request
router.get("/", getAllPublicBooksController);
//!admin get request
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllBooksController,
);

router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook,
);

export default router;
