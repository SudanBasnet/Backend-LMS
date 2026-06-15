import { responseClient } from "../middleware/responseClient.js";
import { createNewUser, updateUser } from "../models/User/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  createNewSession,
  deleteSession,
} from "../models/Session/SessionModel.js";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/email/emailService.js";

//!insert new user
export const insertNewUser = async (req, res, next) => {
  try {
    console.log(req.body);
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
            "we have sent you an email with activation link. please check you email and follow instructions for activation";
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
