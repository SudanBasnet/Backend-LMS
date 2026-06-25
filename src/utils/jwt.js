import jwt from "jsonwebtoken";
import { createNewSession } from "../models/Session/SessionModel.js";
import { updateUser } from "../models/User/UserModel.js";

//!generate accessJWT
export const createAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "1min",
  });
  //store
  const obj = {
    token,
    expire: new Date(Date.now() + 15 * 60 * 1000), //15 mins
  };
  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};
//decode accessJWT

//!generate refreshJWT
export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });
  //store
  const user = await updateUser({ email }, { refreshJWT });
  console.log(user);
  return user?._id ? refreshJWT : null;
};

//!create access and refreshjwt
export const getJwts = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};

//!decode refresh jwt
export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};

//!verify jwt
export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESSJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};
