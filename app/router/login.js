const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'login.html'));
})

const logProfile = require('../models/profile');

router.post('/', (req,res)=>{
    const username = req.body.userName;
    const password = req.body.Password;

    console.log("Login post req");
    logProfile.findOne({userName:req.body.userName})
        .then(person=>{
            if(!person){
                return res.status(404).json({emailerr:"Not found"});
            }else{
                if(password==person.password){
                    


                    res.status(200).json({logInfo:"Success"});
                }else{
                    res.status(400).json({passerr:"Incorrect"});
                }
            }
        })
})

module.exports = router;