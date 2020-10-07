const mongoose = require('mongoose');

const relationshipsModel = mongoose.model('relationships',{
    to:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
});

module.exports = relationshipsModel;