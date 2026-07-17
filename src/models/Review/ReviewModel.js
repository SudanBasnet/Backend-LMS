import ReviewSchema from "./ReviewSchema.js";

//!inserting new Review
export const createReviews = (reviewobj) => {
  return ReviewSchema(reviewobj).save();
};

// //!get Review based on role
export const getReviews = (filter) => {
  return ReviewSchema.find(filter).sort({ updatedAt: 1 });
};
//!update Review
export const updateReview = (filter, obj) => {
  return ReviewSchema.findOneAndUpdate(filter, obj, { new: true });
};
//!delete Review for return
export const deleteReview = (filter) => {
  return ReviewSchema.findOneAndDelete(filter);
};
