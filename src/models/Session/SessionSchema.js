import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 360000000),
      expires: 0, //1 hr
    },
  },
  { timestamps: true },
);

export default mongoose.model("Session", SessionSchema);
