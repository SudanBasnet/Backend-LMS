import BorrowSchema from "./BorrowHistorySchema.js";

//!inserting new Borrow
export const createNewBorrow = (BorrowObj) => {
  return BorrowSchema(BorrowObj).save();
};
// //!update Borrow
// export const updateBorrow = (filter, update) => {
//   return BorrowSchema.findOneAndUpdate(filter, update, { new: true });
// };

// //!Get Borrow
// export const getBorrowByEmail = (email) => {
//   return BorrowSchema.findOne({ email });
// };

// //!Get one Borrow
// export const getOneBorrow = (filter) => {
//   return BorrowSchema.findOne(filter);
// };
