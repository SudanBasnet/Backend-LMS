import { responseClient } from "../middleware/responseClient.js";
import {
  createNewUser,
  getUserByEmail,
  getUserByGoogleId,
  updateUser,
} from "../models/User/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  createNewSession,
  deleteManySession,
  deleteSession,
} from "../models/Session/SessionModel.js";
import {
  passwordResetOTPSendEmail,
  userActivatedNotificationEmail,
  userActivationUrlEmail,
  userPasswordUpdatedNotificationEmail,
} from "../services/email/emailService.js";
import { getJwts } from "../utils/jwt.js";
import { generateRandomOTP } from "../utils/randomGenerator.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client();

//!insert new user
export const insertNewUser = async (req, res, next) => {
  try {
    //*hashing password
    const { password } = req.body;
    req.body.password = hashPassword(password);
    //* inserting new user
    const user = await createNewUser(req.body);
    if (user?._id) {
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        const activationUrl = url;

        const emailId = await userActivationUrlEmail({
          email: user.email,
          activationUrl,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "we have sent you an email with activation link. please check your email and follow instructions for activation";
          return responseClient({ req, res, message });
        }
      }
    }
    throw new Error("Unable to create an account, try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists";
      error.statusCode = 400;
    }
    next(error);
  }
};

//!activate User
export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });

    if (session?._id) {
      //update user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" },
      );
      if (user?._id) {
        //send email notification
        await userActivatedNotificationEmail({
          email: user.email,
          name: user.fName,
        });
        const message = "Your account has been activated, you may login now";
        return responseClient({ req, res, message });
      }
    }
    const message = "invalid link or token expired!";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

//!User Login feature
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user?._id && user.password) {
      //* Compare password

      const isPassMatch = comparePassword(password, user.password);
      if (isPassMatch) {
        //* Mark the user as active after a successful login
        await updateUser({ _id: user._id }, { status: "active" });
        //*Create JWT
        const jwts = await getJwts(user.email);
        //*response JWT
        return responseClient({
          req,
          res,
          message: "Login Successful",
          payload: jwts,
        });
      }
    }

    const message = "Invalid credentials";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const authenticateWithGoogle = async (req, res, next) => {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      const error = new Error("Google sign-in is not configured");
      error.statusCode = 500;
      throw error;
    }

    let googleProfile;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: req.body.credential,
        audience: googleClientId,
      });
      googleProfile = ticket.getPayload();
    } catch {
      return responseClient({
        req,
        res,
        message: "Google credential is invalid or expired",
        statusCode: 401,
      });
    }

    const {
      sub: googleId,
      email,
      email_verified: emailVerified,
      given_name: givenName,
      family_name: familyName,
      name = "",
      picture: avatarUrl,
    } = googleProfile || {};

    if (!googleId || !email || !emailVerified) {
      return responseClient({
        req,
        res,
        message: "A verified Google email address is required",
        statusCode: 401,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await getUserByGoogleId(googleId);

    if (!user) {
      user = await getUserByEmail(normalizedEmail);

      if (user?._id) {
        const linkedProviders = user.password
          ? ["password", "google"]
          : ["google"];
        user = await updateUser(
          { _id: user._id },
          {
            $set: {
              googleId,
              avatarUrl,
              emailVerified: true,
              status: "active",
            },
            $addToSet: { authProviders: { $each: linkedProviders } },
          },
        );
      } else {
        const nameParts = name.trim().split(/\s+/).filter(Boolean);
        user = await createNewUser({
          fName: givenName?.trim() || nameParts[0] || "Google",
          lName:
            familyName?.trim() || nameParts.slice(1).join(" ") || "Member",
          email: normalizedEmail,
          googleId,
          authProviders: ["google"],
          avatarUrl,
          emailVerified: true,
          status: "active",
          role: "user",
        });
      }
    } else {
      const linkedProviders = user.password
        ? ["password", "google"]
        : ["google"];
      user = await updateUser(
        { _id: user._id },
        {
          $set: { avatarUrl, emailVerified: true, status: "active" },
          $addToSet: { authProviders: { $each: linkedProviders } },
        },
      );
    }

    const jwts = await getJwts(user.email);
    return responseClient({
      req,
      res,
      message: "Google authentication successful",
      payload: jwts,
    });
  } catch (error) {
    next(error);
  }
};

//!user Logout feature

export const logoutUser = async (req, res, next) => {
  try {
    //get the token
    const { email } = req.userInfo;
    //update refreshtoken to ""
    await updateUser({ email }, { refreshJWT: "" });
    ///remove the access JWT from session table
    await deleteManySession({ association: email });
    responseClient({ req, res, message: "you are logged out!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!Generate OTP feature

export const generateOTP = async (req, res, next) => {
  try {
    //get the token
    const { email } = req.body;
    // get user by email
    const user = typeof email === "string" ? await getUserByEmail(email) : null;
    if (user?._id) {
      //if valid then generate OTP
      const otp = generateRandomOTP();
      console.log(otp);

      //store in session table
      const session = await createNewSession({
        token: otp,
        association: email,
        expire: new Date(Date.now() + 1000 * 60 * 5), // expire in 1000 * 60 *5
      });
      if (session?._id) {
        console.log(session);
        await passwordResetOTPSendEmail({
          email,
          name: user.fName,
          otp,
        });
      }
      //send otp to user email
    } else {
      console.log("Password reset OTP requested for unknown email:", email);
    }

    responseClient({ req, res, message: "OTP is sent to your email" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!reset controller

export const resetNewPassword = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    //checkotp in sessionTable
    const session = await deleteSession({ token: otp, association: email });
    if (session?._id) {
      //encrypt
      const hassPass = hashPassword(password);
      //update user table
      const user = await updateUser({ email }, { password: hassPass });
      if (user?._id) {
        //send email notification
        await userPasswordUpdatedNotificationEmail({ name: user.fName, email });
        return responseClient({
          req,
          res,
          message:
            "your password has been updated successfully, you may login now",
        });
      }
    }

    responseClient({
      req,
      res,
      statusCode: 400,
      message: "Invalid Data or token is expired",
    });
  } catch (error) {
    next(error);
  }
};
