const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

router.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

router.get('/register',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'register.html'));
})

router.get('/register.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'register.html'));
})

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'login.html'));
})

router.get('/login.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'login.html'));
})

router.get('/reset',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'reset.html'));
})

router.get('/reset.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'reset.html'));
})

router.get('/chatbox',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'chatbox.html'));
})

router.get('/chatbox.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'chatbox.html'));
})

module.exports = router;