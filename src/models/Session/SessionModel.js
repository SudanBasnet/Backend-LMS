import SessionSchema from "./SessionSchema.js";

//!inserting new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

//!deleting session
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

//!deleting multiple session
export const deleteManySession = (filter) => {
  return SessionSchema.deleteMany(filter);
};

//!get session
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
