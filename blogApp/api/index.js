const express= require('express');
const app= express();
const cors = require("cors");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const UserModel = require('./models/UserModel');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
const { upload } = require('./configs/multerconfig');
const PostModel = require('./models/PostModel');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(express.json());
const secret="ieobng7we0gjnewapri08ty42iyg208g2480";
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173' // Allow this specific origin
}));
main().then(()=>console.log("connected to mongo successfully")).catch(err=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogApp");
}
app.listen(8080,()=>console.log("listening at port no. 8080"));

let salt = bcrypt.genSaltSync(10);
app.get("/",(req,res)=>{
    res.send("hai");
});
app.post("/register",(req,res)=>{
    let {username,password,email}= req.body;
    console.log(username,password,email);
    let User= new UserModel({
        Username:username,
        Password: bcrypt.hashSync(password,salt),
        Email:email
    });
     User.save().then((re)=>res.status(200).json(re)).catch((e)=>{res.status(400).json(e);});
});
app.post("/login",async(req,res)=>{
    let {username,password}= req.body;
    let User= await UserModel.findOne({Username:username});
    if(User !=undefined && bcrypt.compareSync(password,User.Password)){
        let token=jwt.sign({username,id:User._id},secret);
        res.cookie("token",token).json({
            id:User._id,
            username:username
        }).status(200);
    }
    else res.status(400).json("sorry something went wrong");
});
app.get("/profile",(req,res)=>{
    let {token}= req.cookies;
    // console.log("token",token);
    if(token=='' || token==undefined)res.json({});
    else{
        jwt.verify(token,secret,{},(err,data)=>{
            if(err)throw err;
            else res.json(data);
        });
    }
})
app.post("/logout",(req,res)=>{
    res.cookie("token","").json("ok");
})
app.post("/post",upload.single("file"),async(req,res)=>{
    let {title,content,summary}= req.body;
    let {token}= req.cookies;
    jwt.verify(token,secret,{},async(err,data)=>{
        if(err)throw err;
        else {
            let newpost= await PostModel.create({
                title,
                content,
                summary,
                Cover:req.file.filename,
                author:data.id
            });
            newpost.save();
            res.json(newpost);
        } 
    });
})
app.get("/post",async (req,res)=>{
    let posts= await PostModel.find().populate('author',['Username']).sort({createdAt:-1}).limit(20);
    // console.log(posts);
    res.json(posts);
})
app.get('/post/:id',async(req,res)=>{
    let {id}= req.params;
    let post= await PostModel.findById(id).populate('author',['Username']);
    // console.log(post);
    res.json(post);
})
app.put("/post",upload.single("file"),async(req,res)=>{
    let {title,summary,content,id}= req.body;
    let currpost= await PostModel.findById(id);
    let {token}= req.cookies;
    jwt.verify(token,secret,{},async(err,data)=>{
        if(err)throw err;
        else {
            console.log(data,currpost);
            if(data.id==currpost.author._id){
                let file=currpost.Cover;
                if(req.file)file=req.file.filename;
                await PostModel.findByIdAndUpdate(id,{
                    title,
                    summary,
                    content,
                    Cover:file
                });
                res.json("ok");
            }
            else res.status(400).json("you are not allowed to edit this post");
        } 
    });
})