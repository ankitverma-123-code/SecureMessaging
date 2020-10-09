const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    uniqueId:{
        type:String,
        required:true
    },
    usr1AuthToken:{
        type:String
    },
    usr2AuthToken:{
        type:String
    }
});

module.exports = chatWindow = mongoose.model("chatBox",chatSchema);