const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'chatbox.html'));
})

const regProfile = require('../models/profile');
const msgSent = require('../models/chatMsg');

router.post('/',(req,res)=>{
    console.log("Posting Message");
    const msgValues = {from:"",to:"",message:""};
    console.log(req.body);
    
    if(req.body.from!="" && req.body.to!="" && req.body.message!=""){
        msgValues.from = req.body.from;
        msgValues.to = req.body.to;
        msgValues.message = req.body.message;
    }
    console.log("Values in server object");
    console.log(msgValues);
    regProfile.findOne({userName:req.body.to})
        .then(profileEmail=>{
            if(profileEmail){
                //res.status(400).json({pro:"Profile exists"});
                const newMessage = new msgSent({
                    from:req.body.from,
                    to:req.body.to,
                    message:req.body.message
                });
                newMessage
                .save()
                .then(
                    status=>{
                        res.json(status);
                    }
                )
                .catch(err=>{
                    res.json(err);
                })
            }else{
                /*
                const newProfile = new regProfile({
                    userName:req.body.userName,
                    email:req.body.email,
                    password:req.body.Password
                });
                */
               res.status(404).json({pro:"Profile does not exists"});
                /*
               newProfile
                    .save()
                    .then( 
                        profileRes => 
                        res.json(profileRes)
                        )
                    .catch(err=>console.log(err));
                */

            }
        })
        .catch(err=>console.log("Find err"+err));
});



module.exports = router;

