import multer from "multer";
import moment from "moment";


const storage = multer.diskStorage({
    destination: './uploadedContent',
    filename: function(_req , file, cb) {
      const date = Date.now();
      const formattedDate = moment(date).format('MMMM-Do-YYYY-h-mm-ss-a');
      const generatedFilename = file.fieldname + '-' + formattedDate + '.csv';
      // Attach the filename to the request object
      _req.generatedFilename = generatedFilename;
  
      cb(null, generatedFilename);
    } 
  });


export default storage;