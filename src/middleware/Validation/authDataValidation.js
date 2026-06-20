import Joi from "joi";
import { validateData } from "./joiValidation.js";
import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD,
  PHONE,
  SESSION_REQ,
  TOKEN_REQ,
} from "./joiConst.js";

//!User Data Validation
export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    email: EMAIL_REQ,
    phone: PHONE,

    // Validate the password on the server as well as on the client.
    password: PASSWORD,
  };
  validateData({ req, res, next, obj });
};

//!session Validation
export const userActivationDataValidation = (req, res, next) => {
  const obj = {
    sessionId: SESSION_REQ,
    t: TOKEN_REQ,
  };
  validateData({ req, res, next, obj });
};
