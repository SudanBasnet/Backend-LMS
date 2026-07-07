import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middleware/Validation/bookDataValidation.js";
import { upload } from "../utils/multer.js";
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
//!insert book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  upload.single("image"),
  // upload.array("image", 2),
  newBookDataValidation,
  insertNewBook,
);

//!update the book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  updateBookDataValidation,
  updateBookController,
);
//!delete the book
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMiddleware,
  deleteBookController,
);

export default router;
