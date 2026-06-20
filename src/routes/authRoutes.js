import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";
import {
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/Validation/authDataValidation.js";

const router = express.Router();

//!user Register router

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);

export default router;
