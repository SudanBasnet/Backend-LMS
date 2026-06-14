import bcrypt from "bcryptjs";
const saltRounds = 15;
//!hashing password
export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};
