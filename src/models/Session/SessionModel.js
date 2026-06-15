import SessionSchema from "./SessionSchema.js";

//!inserting new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};
//!deleting session
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
