//! multer setup
import path from "path";
import multer from "multer";
import fs from "fs";

const __dirname = path.resolve();

// const fpDestination = path.join(__dirname, "public/img");
const fpDestination = "public/img/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check if directory exists, if not create new one
    !fs.existsSync(fpDestination) &&
      fs.mkdirSync(fpDestination, { recursive: true });
    cb(null, fpDestination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filePath = uniqueSuffix + "-" + file.originalname;
    cb(null, filePath);
  },
});

//filter to allow images only

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|jif|webp/;

  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFileTypes.test(extName); //True or False
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (isAllowedExt && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg|jpg|png|jif|webp are allowed"));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});
// const upload = multer({ dest: "uploads/" });

//!end multer setup
