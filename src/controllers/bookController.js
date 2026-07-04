export const insertNewBook = (req, res, next) => {
  const data = req.body;

  res.json({ message: "ToDOO", data });
};
