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
                return res.status(404).json({emailerr:"Not found"});
            }else{
                if(password==person.password){
                    console.log("Inside password comparision");
                    authToken.findOneAndUpdate({userName:req.body.userName},{authToken:"ABCDEFG",authExpire:"Soon2Expire"},{upsert: true,useFindAndModify:false})
                        .then(updatedDocument=>{
                            if(updatedDocument){
                                console.log("Updated"+updatedDocument);
                            }else{
                                console.log("Not updated"+updatedDocument);
                            }
                            return updatedDocument;
                        })
                        .catch(err=>console.log(err));
                    res.status(200).json({logInfo:"Success"});
                }else{
                    res.status(400).json({passerr:"Incorrect"});
                }
            }
        })
})

module.exports = router;