const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userName:{
        type:String,
        require:true
    },
    authToken:{
        type:String,
        require:true
    },
    authExpire:{
        type:String
    }
});

module.exports = authT = mongoose.model("authToken",ProfileSchema);