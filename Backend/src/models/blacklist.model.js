const mongoose=require('mongoose');

const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const blacklistModel=mongoose.model("blacklistToken",blacklistSchema)

module.exports=blacklistModel;
