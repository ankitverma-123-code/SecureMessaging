const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    console.log("Sending Reg page");
    res.sendFile(path.join(__dirname+'./../views/'+'register.html'));
})

const regProfile = require('../models/profile');
const authToken = require('./../models/authToken');

router.post('/',(req,res)=>{
    console.log("Posting request");
    const profileValues = {username:"",password:""};
    console.log(req.body);
    
    if(req.body.username!="" && req.body.password!=""){
        profileValues.username = req.body.userName;
        profileValues.password = req.body.Password;
    }
    console.log("Values in server object");
    console.log(profileValues);
    regProfile.findOne({userName:req.body.userName})
        .then(profileUName=>{
            if(profileUName){
                res.status(400).json({profileUName:"profileUName exists"});
            }else{
                const newProfile = new regProfile({
                    userName:req.body.userName,
                    password:req.body.Password
                });
                newProfile
                    .save()
                    .then( 
                        profileRes => 
                        console.log("profileRes"+profileRes)
                        //res.json(profileRes)
                        )
                    .catch(err=>console.log(err));

                const authTokenDB = new authToken({
                    userName:req.body.userName,
                    authToken:"",
                    authExpire:""
                });
                
                authTokenDB
                    .save()
                    .then(authRes => 
                        console.log("authRes"+authRes))
                    .catch(err=>console.log("Err"+err));

                res.status(200).json("Registration and authorization done");
            }
        })
        .catch(err=>console.log("Find err"+err));
});

module.exports = router;