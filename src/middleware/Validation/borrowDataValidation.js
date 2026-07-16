import {
  _ID_REQ,
  EXPECTEDAVAILABLE,
  ISBN_REQ,
  JSON_ARRAY_STR,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  YEAR_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

//! Book Validation
export const newBorrowDataValidation = (req, res, next) => {
  const obj = {
    bookId: SHORT_STR_REQ,
    bookTitle: SHORT_STR_REQ,
    thumbnail: SHORT_STR_REQ,
    bookSlug: SHORT_STR_REQ,
  };
  validateData({ req, res, next, obj });
};

//! Return book validation
export const returnBookDataValidation = (req, res, next) => {
  const obj = {
    _id: _ID_REQ,
  };
  validateData({ req, res, next, obj });
};

// //!updated book validation
// export const updateBookDataValidation = (req, res, next) => {
//   req.body.expectedAvailable =
//     req.body.expectedAvailable === "null" ? null : req.body.expectedAvailable;
//   console.log(req.body);
//   const obj = {
//     status: STATUS_REQ,
//     _id: _ID_REQ,
//     title: SHORT_STR_REQ,
//     year: YEAR_REQ,
//     author: SHORT_STR_REQ,
//     imgUrl: LONG_STR_REQ,
//     imageList: JSON_ARRAY_STR.allow(""),
//     imgToDelete: JSON_ARRAY_STR.allow(""),

//     genre: SHORT_STR_REQ,
//     description: LONG_STR_REQ,
//     expectedAvailable: EXPECTEDAVAILABLE,
//   };
//   validateData({ req, res, next, obj });
// };
