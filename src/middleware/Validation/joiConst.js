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
export const TOKEN_REQ = Joi.string().min(5).max(40).required();
export const OTP = Joi.number().min(999).max(9999).required();

//!Book Constants

export const SHORT_STR = Joi.string().min(1).max(100);
export const SHORT_STR_REQ = SHORT_STR.required();

export const LONG_STR = Joi.string().min(1).max(5000);
export const LONG_STR_REQ = LONG_STR.required();
export const YEAR = Joi.number()
  .integer()
  .min(1901)
  .max(new Date().getFullYear());
export const YEAR_REQ = YEAR.required();

// export const ISBN = Joi.number().integer().min(1000000000).max(99999999999999);
export const ISBN = Joi.string()
  .pattern(/^\d{10}$|^\d{13}$/)
  .messages({
    "string.pattern.base": "ISBN is not in valid format",
  });
export const ISBN_REQ = ISBN.required();
