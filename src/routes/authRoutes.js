import express from "express";
import {
  activateUser,
  authenticateWithGoogle,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
  resetNewPassword,
} from "../controllers/authController.js";
import {
  googleAuthDataValidation,
  loginDataValidation,
  newPasswordResetValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/Validation/authDataValidation.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

//!user Register router

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);
router.post("/google", googleAuthDataValidation, authenticateWithGoogle);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", userAuthMiddleware, logoutUser);
router.post("/otp", generateOTP);
router.post("/reset-password", newPasswordResetValidation, resetNewPassword);

export default router;
