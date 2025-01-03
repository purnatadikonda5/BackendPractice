const express= require("express");
const multer= require("multer");
const Crypto= require('crypto');
const path= require('path');
let app =express();
app.listen(8080,()=>console.log("listening at port no. 8080"));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
      Crypto.randomBytes(12,function (err,bytes){
      cb(null, bytes.toString("hex")+path.extname(file.originalname));
      })
       }
  })
  const upload = multer({ storage: storage })
  
app.set('views-engine','ejs');
app.get("/",(req,res)=>{
    res.render("fileform.ejs");
})
app.post("/",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("fileform");
})