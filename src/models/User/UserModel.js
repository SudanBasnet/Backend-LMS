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
  if (typeof email !== "string") return null;
  return UserSchema.findOne({ email: email.trim().toLowerCase() });
};

export const getUserByGoogleId = (googleId) => {
  return UserSchema.findOne({ googleId });
};

//!Get one user
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
