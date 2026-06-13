import express from "express";
const router = express.Router();

//!user Register router

router.post("/", (req, res, error) => {
  try {
    res.json({
      status: "success",
      message: "TODo",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
