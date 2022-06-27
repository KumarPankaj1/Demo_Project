import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
    destination: `./uploads/imageUploads`,
    filename: (req: any, file: any, cb: any) => {
      console.log(file);
      
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const videoStorage = multer.diskStorage({
    destination: `./uploads/videoUploads`,
    filename: (req: any, file: any, cb: any) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const imageUpload = multer({
    storage: imageStorage,
  });
  
  
  const videoUpload = multer({
    storage: videoStorage,
    fileFilter: function(req,file,cb){
      var ext = path.extname(file.originalname);
      if(ext!== ".mkv"  && ext!== ".mp4"){
          return cb(new Error('Only videos are allowed'))
      }
      cb(null,true)
    }
  });
  
  export { imageUpload, videoUpload };