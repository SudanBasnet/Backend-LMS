import express from "express";
import { insertNewBook } from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import { newBookDataValidation } from "../middleware/Validation/bookDataValidation.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "TODO" });
});

router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook,
);

export default router;
