const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./../views/'+'register.html'));
})

const regPro = require('../models/profile');

router.post('/',(req,res)=>{
    regPro.findOne({email:req.body.email})
        .then(profile=>{
            if(profile){
                return res
                    .status(400)
                    .json({emailErr:"Email exists"});
            }
        })
});


module.exports = router;