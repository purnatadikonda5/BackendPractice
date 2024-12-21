let mongoose = require("mongoose");

let userschema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number
    }
})
let User= mongoose.model("User",userschema);
module.exports={User};