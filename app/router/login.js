const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'login.html'));
})

/*
router.get('/login.html',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'login.html'));
})
*/
module.exports = router;

