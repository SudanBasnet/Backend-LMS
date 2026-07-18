import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required() {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    refreshJWT: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    authProviders: {
      type: [String],
      enum: ["password", "google"],
      default: ["password"],
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
