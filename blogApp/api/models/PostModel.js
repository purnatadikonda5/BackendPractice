const mongoose =require('mongoose');

let PostSchema= mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    Cover:String
},{
    timestamps:true
})
let PostModel= mongoose.model("PostModel",PostSchema);
module.exports=PostModel;