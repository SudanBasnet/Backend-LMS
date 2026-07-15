import { responseClient } from "../middleware/responseClient.js";

import {
  deleteFile,
  deleteUploadedFiles,
} from "../middleware/Validation/fileUtil.js";
// import slugify from "slugify";
import { createNewBorrow } from "../models/BorrowHistory/BorrowHistoryModel.js";
const BOOK_DUE_DAYS = 15;
//!insert new Borrow
export const insertNewBorrow = async (req, res, next) => {
  const { _id } = req.userInfo;
  let today = new Date();
  const obj = {
    userId: _id,
    ...req.body,
    dueDate: today.setDate(today.getDate() + BOOK_DUE_DAYS),
  };
  const Borrow = await createNewBorrow(obj);
  Borrow._id
    ? responseClient({
        req,
        res,
        message: "Borrow Has been added successfully",
      })
    : responseClient({
        req,
        res,
        message: " Unable to add new Borrow,try again later",
        statusCode: 401,
      });

  if (error.message.includes("E11000 duplicate key")) {
    return responseClient({
      req,
      res,
      message: " Duplicate Data detected: " + JSON.stringify(error.keyValue),
      statusCode: 400,
    });
  }
  next(error);
};

// //!update Borrow
// export const updateBorrowController = async (req, res, next) => {
//   try {
//     const { fName, _id } = req.userInfo;
//     let imageList = [];
//     let imgToDelete = [];

//     try {
//       imageList = JSON.parse(req.body.imageList || "[]");
//     } catch {
//       imageList = [];
//     }

//     try {
//       imgToDelete = JSON.parse(req.body.imgToDelete || "[]");
//     } catch {
//       imgToDelete = [];
//     }

//     if (imgToDelete.length) {
//       imageList = imageList.filter((img) => !imgToDelete.includes(img));
//       imgToDelete.map((img) => deleteFile(img));
//       if (imgToDelete.includes(req.body.imgUrl)) {
//         req.body.imgUrl = imageList[0] || "";
//       }
//     }

//     if (Array.isArray(req.files) && req.files.length) {
//       req.body.imageList = [
//         ...imageList,
//         ...req.files.map((obj) => obj.path),
//       ].filter((img, index, images) => img && images.indexOf(img) === index);
//     } else {
//       req.body.imageList = imageList;
//     }
//     delete req.body.imgToDelete;

//     const obj = {
//       ...req.body,

//       lastupdatedby: {
//         name: fName,
//         adminId: _id,
//       },
//     };
//     const Borrow = await updateBorrow(obj);
//     console.log(Borrow);
//     Borrow._id
//       ? responseClient({
//           req,
//           res,
//           message: "Borrow Has been updated successfully",
//           payload: Borrow,
//         })
//       : responseClient({
//           req,
//           res,
//           message: " Unable to update Borrow,try again later",
//           statusCode: 401,
//         });
//   } catch (error) {
//     next(error);
//   }
// };

// //!delete Borrow
// export const deleteBorrowController = async (req, res, next) => {
//   try {
//     const { _id } = req.params;
//     const Borrow = await deleteBorrow(_id);

//     if (Borrow?._id) {
//       [Borrow.imgUrl, ...(Array.isArray(Borrow.imageList) ? Borrow.imageList : [])]
//         .filter((img, index, images) => img && images.indexOf(img) === index)
//         .map((img) => deleteFile(img));

//       return responseClient({
//         req,
//         res,
//         message: "Borrow Has been deleted successfully",
//       });
//     }

//     responseClient({
//       req,
//       res,
//       message: " Unable to delete Borrow,try again later",
//       statusCode: 404,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// //! get all Borrows for public
// export const getAllPublicBorrowsController = async (req, res, next) => {
//   try {
//     const payload = await getAllPublicBorrows();
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "Borrow Has been fetched successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// //! get single Borrow for public
// export const getSinglePublicBorrowsController = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const payload = await findOneBorrow({ slug, status: "active" });
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "Borrow Has been fetched successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// //! get all Borrows for public
// export const getAllBorrowsController = async (req, res, next) => {
//   try {
//     const payload = await getAllBorrows();
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "Borrow Has been fetched successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
