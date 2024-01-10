import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Define your destination folder
      cb(null, 'frontend/public/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now()+Math.floor(Math.random() * 1000)+".jpg")
    },
  });
  
  const upload = multer({ storage });
export default upload