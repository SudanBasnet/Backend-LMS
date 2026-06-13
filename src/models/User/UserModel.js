import UserSchema from "./UserSchema.js";

//!inserting new user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
