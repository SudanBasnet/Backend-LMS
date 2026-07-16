import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    bookSlug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Review",
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnedDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    expectedAvailable: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Borrow", borrowSchema);
