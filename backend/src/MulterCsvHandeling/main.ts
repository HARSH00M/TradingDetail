import storage from "./storage";
import multer from "multer";
import checkFileType from "./filter";

export default function upload() {

  
  return multer({
    storage: storage,
    limits: {
      fields: 5,
      fieldNameSize: 50, // TODO: Check if this size is enough
      fieldSize: 20000, // TODO: Check if this size is enough
      // TODO: Change this line after compression
      fileSize: 15000000, // 15 MB
    },
    fileFilter: function (_req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('csvfile')
}



