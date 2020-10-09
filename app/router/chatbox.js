const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'chatbox.html'));
})

/*
router.get('/chatbox',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'chatbox.html'));
})

router.get('/chatbox.html',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'chatbox.html'));
})
*/
module.exports = router;

