import { unlink } from "fs";
import { resolve } from "path";

//actually delete the files
const deleteFile = (filePath) => {
  try {
    const resolvedPath = resolve(filePath);
    console.log(filePath, "uploaded file will be deleted in 2 seconds");

    setTimeout(() => {
      unlink(resolvedPath, (error) => {
        if (error) {
          return console.log(error);
        }
        console.log(filePath, "uploaded file deleted");
      });
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

//is single file or array of files

export const deleteUploadedFiles = (req) => {
  //single file
  if (req.file) {
    deleteFile(req.file.path);
    return;
  }
  if (req.files) {
    req.files.map((f) => deleteFile(f.path));
  }
};
