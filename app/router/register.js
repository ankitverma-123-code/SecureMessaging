const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    console.log("Sending Reg page");
    res.sendFile(path.join(__dirname+'./../views/'+'register.html'));
})

const regProfile = require('../models/profile');

router.post('/',(req,res)=>{
    console.log("Posting request");
    const profileValues = {email:"",username:"",password:""};
    console.log(req.body);
    
    if(req.body.email!="" && req.body.username!="" && req.body.password!=""){
        profileValues.username = req.body.userName;
        profileValues.email = req.body.email;
        profileValues.password = req.body.Password;
    }
    console.log("Values in server object");
    console.log(profileValues);
    regProfile.findOne({email:req.body.email})
        .then(profileEmail=>{
            if(profileEmail){
                res.status(400).json({email:"Email exists"});
            }else{
                const newProfile = new regProfile({
                    userName:req.body.userName,
                    email:req.body.email,
                    password:req.body.Password
                });
                newProfile
                    .save()
                    .then( 
                        profileRes => 
                        res.json(profileRes)
                        )
                    .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log("Find err"+err));
});

module.exports = router;