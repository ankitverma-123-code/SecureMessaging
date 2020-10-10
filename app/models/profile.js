const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

module.exports = Profile = mongoose.model("userProfile",ProfileSchema);