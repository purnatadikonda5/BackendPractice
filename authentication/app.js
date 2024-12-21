const express= require('express');
let app = express();
let mongoose =require('mongoose');
let bcrypt= require('bcrypt');
const { User } = require('./models/user');
const jwt= require('jsonwebtoken');
main().then(()=>console.log("connected successfully")).catch(err=>console.log(err));
let cookiePraser= require('cookie-parser');
app.use(cookiePraser());
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/authtest");
}
app.listen(8080,()=>console.log("listening on port 8080"));

app.get("/",(req,res)=>{
    res.send("THIS IS THE ROOT PAGE");
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/register",(req,res)=>{

    res.render("registerform.ejs");
})
app.post("/register",(req,res)=>{
    console.log(req.body.password);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            let newuser= new User({
                email:req.body.email,
                password:hash,
                username:req.body.username,
                age:req.body.age
            });
            newuser.save().then((res)=>console.log(res)).catch(err=>console.log(err));
        });
    });
    res.send("working");
})
app.get("/login",(req,res)=>{
    res.render("loginform.ejs");
})
app.post("/login",async(req,res)=>{
    console.log(req.body);
    let user1= await User.findOne({email:req.body.email});
    bcrypt.compare(req.body.password, user1.password, function(err, result) {
        if(result){
           let token= jwt.sign({email:req.body.email},"secret");
           res.cookie("token",token);
           console.log(token);
           res.redirect("/secret");
        }
        else{
            res.send("something went wrong");
        }
    });
})
app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})
app.get("/secret", async(req,res)=>{
    let token= req.cookies.token;
    if(token==""){
        res.send("YOU ARE NOT ALLOWED TO VIEW DATA");
    }
    else{
        let data=jwt.verify(token,"secret");
        email= data.email;
        console.log(data);
        let user= await User.findOne({email:email});
        if(user){
            res.render("secret.ejs");
        }
        else{
            res.send("no user found");
        }
    }
})