const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../views/' + 'chatbox.html'));
})

const regProfile = require('../models/profile');
const msgSent = require('../models/chatMsg');
const chatW = require('./../models/chatWindow');

router.post('/', (req, res) => {
    console.log("Posting Message");
    const msgValues = { from: "", to: "", message: "" };
    console.log(req.body);
    var timeStamp = new Date();

    if (req.body.from != "" && req.body.to != "" && req.body.message != "") {
        msgValues.from = req.body.from;
        msgValues.to = req.body.to;
        msgValues.message = req.body.message;
        msgValues.timeStamp = timeStamp;
    }
    console.log("Values in server object");
    console.log(msgValues);

    const newMessage = new msgSent({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        timeStamp: timeStamp
    });

    regProfile.findOne({ userName: req.body.to })
        .then(profileEmail => {
            if (profileEmail) {

                var usr1;
                var usr2;
                var usr1and2;
                if (req.body.to > req.body.from) {
                    usr1 = req.body.from;
                    usr2 = req.body.to;
                } else {
                    usr1 = req.body.to;
                    usr2 = req.body.from;
                }
                usr1and2 = usr1 + usr2;

                chatW.findOne({ usr12: usr1and2 })
                    .then(user12 => {
                        if (user12) {
                            console.log("Chatwindow exists");
                            insertData(usr1and2,newMessage);
                            res.status(400).json({ pro: "Chatwindow exists" });
                        } else {
                            console.log("Chatwindow does not exists creating new collection");
                            createCollections(usr1and2);
                            
                            const newChatWindow = new chatW({
                                user1:usr1,
                                user2:usr2,
                                usr12:usr1and2
                            });

                            newChatWindow
                                .save()
                                .then(succ=>console.log(succ))
                                .catch(err=>console.log(err));

                                insertData(usr1and2,newMessage);

                            res.status(404).json({ pro: "Chatwindow does not exists creating new collection" });
                        }
                    })
                    .catch()

                //res.status(400).json({pro:"Profile exists"});

            } else {
                res.status(404).json({ pro: "Reciever profile does not exists" });
            }
        })
        .catch(err => console.log("Find err" + err));
});

function createCollections(name) {
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');

    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("testdb");
        dbo.createCollection(name, function (err, res) {
            if (err) throw err;
            console.log("Collection created! " + name);
            db.close();
        });
    });
}

function insertData(name, data) {
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');

    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("testdb");
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection(name).insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

module.exports = router;