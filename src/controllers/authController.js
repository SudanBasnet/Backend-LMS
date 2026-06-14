import { responseClient } from "../middleware/responseClient.js";
import { createNewUser } from "../models/User/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    console.log(req.body);
    //*hashing password
    const { password } = req.body;
    req.body.password = hashPassword(password);
    //* inserting new user
    const user = await createNewUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "TODO",
      });
      const message =
        "we have snt you an email with activation link. please check you email and follow instructions for activation";
      return responseClient({ req, res, message });
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
