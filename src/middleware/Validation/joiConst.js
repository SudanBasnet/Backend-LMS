import Joi from "joi";

export const FNAME = Joi.string().min(5);
export const FNAME_REQ = FNAME.required();

export const LNAME = Joi.string().min(5);
export const LNAME_REQ = LNAME.required();

export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAIL_REQ = EMAIL.required();

export const PHONE = Joi.number().min(5);
export const PHONE_REQ = Joi.number().min(5);
export const PASSWORD = Joi.string();
export const PASSWORD_REQ = Joi.string()
  .min(6) // Must contain at least 6 characters.
  .pattern(/[A-Z]/) // Must contain at least one uppercase letter.
  .pattern(/[a-z]/) // Must contain at least one lowercase letter.
  .pattern(/[0-9]/) // Must contain at least one number.
  .pattern(/[!@#$%^&*()_+<>?:{}|]/) // Must contain at least one allowed special character.
  .required();

export const SESSION = Joi.string().min(10).max(30);
export const SESSION_REQ = Joi.string().min(10).max(30).required();

export const TOKEN = Joi.string().min(10).max(30);
export const TOKEN_REQ = Joi.string().min(5).max(30).required();
