const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"usrid"
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

module.exports = Profile = mongoose.model("usrProfile",ProfileSchema);