const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

router.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

module.exports = router;