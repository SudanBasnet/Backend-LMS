import { responseClient } from "../middleware/responseClient.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  return responseClient({ req, res, message, statusCode });
};
