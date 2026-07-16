import BorrowSchema from "./BorrowHistorySchema.js";

//!inserting new Borrow
export const createBorrows = (BorrowArg) => {
  return BorrowSchema.insertMany(BorrowArg);
};

// //!get Borrow based on role
export const getBorrowsRBAC = (filter) => {
  return BorrowSchema.find(filter);
};
//!update borrow for return
export const updateBorrow = (filter, update) => {
  return BorrowSchema.findOneAndUpdate(filter, update, { new: true });
};
