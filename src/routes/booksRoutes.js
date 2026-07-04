import express from "express";
import { insertNewBook } from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "TODO" });
});

router.post("/", userAuthMiddleware, adminAuthMiddleware, insertNewBook);

export default router;
