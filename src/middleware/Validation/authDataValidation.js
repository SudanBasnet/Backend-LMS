import Joi from "joi";
import { validateData } from "./joiValidation.js";
import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD_REQ,
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
    password: PASSWORD_REQ,
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

//!Login Data Validation
export const loginDataValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};
