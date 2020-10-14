const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = Profile = mongoose.model("userProfile",ProfileSchema);