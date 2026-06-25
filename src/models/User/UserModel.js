import UserSchema from "./UserSchema.js";

//!inserting new user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
//!update user
export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};

//!Get user
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

//!Get one user
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
