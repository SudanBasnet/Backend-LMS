import express from "express";
import { insertNewBook } from "../controllers/bookController.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "TODO" });
});

router.post("/", insertNewBook);

export default router;
