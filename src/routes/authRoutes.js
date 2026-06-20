import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";
import { validateData } from "../middleware/Validation/joiValidation.js";
const router = express.Router();

//!user Register router

router.post("/register", validateData, insertNewUser);
router.post("/activate-user", activateUser);

export default router;
