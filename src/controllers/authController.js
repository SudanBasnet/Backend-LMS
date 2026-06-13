export const insertNewUser = (req, res, error) => {
  try {
    res.json({
      status: "success",
      message: "TODo",
    });
  } catch (error) {
    next(error);
  }
};
