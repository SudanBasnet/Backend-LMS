import express from "express";
import { insertNewUser } from "../controllers/authController.js";
const router = express.Router();

//!user Register router

router.post("/", insertNewUser);

export default router;
