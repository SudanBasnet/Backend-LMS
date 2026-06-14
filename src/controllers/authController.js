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
        message: "User registered successfully",
      });
      return;
    }

    res.json({
      status: "error",
      message: "Failed to register user",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists";
      error.statusCode = 200;
    }
    next(error);
  }
};
