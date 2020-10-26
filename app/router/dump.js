const express = require('express');
const router = new express.Router();
var path = require('path');
const regProfile = require('./../models/profile');
var wholeCollData = [];


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../views/' + 'dump.html'));
});

router.get('/data', function (req, res) {
    //wholeCollData = [];
    //dumpData("testdb");
    getWholeChat("test");

    res.status(200).json(wholeCollData);
});

function dumpData(DBname) {
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');

    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBname);
        dbo.listCollections().toArray(function (err, collections) {
            console.log(collections);
        });

        db.close();
    });
};

function getCollectionNames(userName) {
    var collectionArr = [];

    regProfile.findOne({ userName: userName })
        .then(profileEmail => {
            if (profileEmail) {
                collectionArr=profileEmail.chatWindow;
                console.log(collectionArr);              
                //call collection data display here it would work i think
                for (let i = 0; i < collectionArr.length; i++) {
                    getCollectionData(collectionArr[i]);
                }
            }
            else {
                res.status(200).json({ response: "Fail" });
            }
        })
        .catch(err => console.log(err));

}

function getCollectionData(collName) {
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');
    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    MongoClient.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
            if (err) throw err;

            client
                .db("testdb")
                .collection(collName)
                .find({})
                .project({ timeStamp: 0, _id: 0 })
                .toArray((err, data) => {
                    if (err) throw err;

                    //console.log(data);
                    wholeCollData.push(data);
                    //console.log(wholeCollData);

                    client.close();
                });
        }
    );

};

function getWholeChat(userName) {
    getCollectionNames(userName);
}

module.exports = router;