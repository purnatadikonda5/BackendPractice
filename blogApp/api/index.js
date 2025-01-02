const express= require('express');
const app= express();
const cors = require("cors");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const UserModel = require('./models/UserModel');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
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
    console.log(username,password,User);
    if(User !=undefined && bcrypt.compareSync(password,User.Password)){
        let token=jwt.sign({username,id:User._id},secret);
        res.cookie("token",token).json({
            id:User._id,
            username:User.username
        }).status(200);
    }
    else res.status(400).json("sorry something went wrong");
});
app.get("/profile",(req,res)=>{
    let {token}= req.cookies;
    if(token=='')res.json(null);
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