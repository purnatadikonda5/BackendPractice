const express= require('express');
const app= express();
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const bcrypt= require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
main().then(()=>console.log("connected to mongo successfully")).catch(err=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogApp");
}
app.listen(8080,()=>console.log("listening at port no. 8080"));

let salt = bcrypt.genSaltSync(10);
app.get("/",(req,res)=>{
    res.send("hai");
});
app.post("/register",async(req,res)=>{
    let {username,password,email}= req.body;
    console.log(username,password,email);
    let User= new UserModel({
        Username:username,
        Password: bcrypt.hashSync(password,salt),
        Email:email
    });
    await User.save();
    res.redirect("http://localhost:5173");
});
app.post("/login",async(req,res)=>{
    let {username,password}= req.body;
    let User= await UserModel.findOne({Username:username});
    console.log(username,password,User);
    if(User !=undefined && bcrypt.compareSync(password,User.Password)){
        res.redirect("http://localhost:5173");
    }
    else res.send("sorry something went wrong");
});