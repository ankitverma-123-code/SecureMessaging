const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../../public/visualization/chatbox.css'));
})

module.exports = router;