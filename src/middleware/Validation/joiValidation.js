import Joi from "joi";
import { responseClient } from "../responseClient.js";

export const validateData = (req, res, next) => {
  const schema = Joi.object({
    fName: Joi.string().min(5).required(),
    lName: Joi.string().min(5).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.number(),

    // Validate the password on the server as well as on the client.
    password: Joi.string()
      .min(6) // Must contain at least 6 characters.
      .pattern(/[A-Z]/) // Must contain at least one uppercase letter.
      .pattern(/[a-z]/) // Must contain at least one lowercase letter.
      .pattern(/[0-9]/) // Must contain at least one number.
      .pattern(/[!@#$%^&*()_+<>?:{}|]/) // Must contain at least one allowed special character.
      .required(),
  });
  //* pass the data, req.body to Schema

  const { error, value } = schema.validate(req.body);
  console.log(value);

  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
