const express = require('express');
const router = new express.Router();
var path = require('path');
const regProfile = require('./../models/profile');
var wholeCollData = [];
var collectionArr = [];

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../views/' + 'dump.html'));
});

router.get('/data', function (req, res) {
    //wholeCollData = [];
    //dumpData("testdb");
    //getWholeChat("test");
    getCollectionNames("test");
    res.status(200).json(collectionArr);
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

async function getCollectionNames(userName) {
    console.log("Start of getCollectionNames");

    await regProfile.findOne({ userName: userName })
        .then(profileEmail => {
            if (profileEmail) {
                collectionArr = profileEmail.chatWindow;
                //console.log(collectionArr);              
            }
            else {
                res.status(200).json({ response: "Fail" });
            }
        })
        .catch(err => console.log(err));

    await console.log("End of getCollectionNames:" + collectionArr);
}

async function getCollectionData(collName) {
    console.log("Start of getCollectionData");
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');
    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    await MongoClient.connect(
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

    console.log("End of getCollectionData");
    console.log(wholeCollData);
};

async function getWholeChat(userName) {
    console.log("Before calling getCollectionNames");
    await getCollectionNames(userName);
    console.log("After calling getCollectionNames");
}

module.exports = router;