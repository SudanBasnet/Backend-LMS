import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "./fileUtil.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = Joi.object(obj);
  //* pass the data, req.body to Schema

  const { error } = schema.validate(req.body);
  if (error) {
    if (req.file || Array.isArray(req.files)) {
      //proceed for deleting the uploaded file
      deleteUploadedFiles(req);
    }
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
