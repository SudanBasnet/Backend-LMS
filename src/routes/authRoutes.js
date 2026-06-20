import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/Validation/authDataValidation.js";

const router = express.Router();

//!user Register router

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);

export default router;
