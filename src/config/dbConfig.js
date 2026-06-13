import mongoose from "mongoose";

const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Provide Mongo URL connection string");
  }
  return mongoose.connect(process.env.MONGO_URL);
};

export default dbConnect;
