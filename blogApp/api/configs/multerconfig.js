const multer =require("multer");
const crypto =require("crypto");
const path= require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,function (err,bytes){
      cb(null, bytes.toString("hex")+path.extname(file.originalname));
      })
      }
  })
const upload = multer({ storage: storage })
module.exports={upload};