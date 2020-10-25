const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'login.html'));
})

const logProfile = require('../models/profile');
const authToken = require('../models/authToken');

router.post('/', (req,res)=>{
    const username = req.body.userName;
    const password = req.body.Password;

    /*
    console.log("Type of data:"+typeof req);
    console.log("Type of data:"+typeof req.body);
    console.log("Type of data:"+typeof req.body.userName);
    */

    //console.log("Login post req");
    logProfile.findOne({userName:req.body.userName})
        .then(person=>{
            if(!person){
                console.log("Email not found");
                return res.status(404).json({emailerr:"Not found"});
            }else{
                console.log(person);
                if(password==person.password){
                    console.log("Inside password comparision");
                    authToken.findOneAndUpdate({userName:username},{authToken:"ABCDEFG",authExpire:"Soon2Expire"},{upsert: true,useFindAndModify:false})
                        .then(updatedDocument=>{
                            if(updatedDocument){
                                console.log("Updated"+updatedDocument);
                            }else{
                                console.log("Not updated");
                            }
                            //return updatedDocument;
                        })
                        .catch(err=>console.log(err));
                    
                    
                    responseObj = {
                        logInfo:"Success",
                        userName:username,
                        authToken:"ABCDEFG"
                    };
                    
                    console.log("Sending response This is not good is that was async");
                    res.status(200).json(responseObj);
                    //res.status(200).json({logInfo:"SuccessTest checking"});
                }else{
                    responseObj = {
                        logInfo:"Fail"
                    };
                    console.log("Password incorrect");
                    res.status(200).json(responseObj);
                }
            }
        })
        .catch(err=>console.log(err));
})

module.exports = router;