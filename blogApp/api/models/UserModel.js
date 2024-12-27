const mongoose= require('mongoose');
let UserSchema= mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Username:{
        type:String,
        required:true,
        maxLength: 20,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    }
});
let UserModel= mongoose.model("UserModel",UserSchema);
module.exports=UserModel;