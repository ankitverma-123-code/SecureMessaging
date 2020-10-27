const express = require('express');
const router = new express.Router();
var path = require('path');
const regProfile = require('./../models/profile');
var wholeCollData = [];
var collectionArr;

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../views/' + 'dump.html'));
});

router.get('/data', function (req, res) {
    //wholeCollData = [];
    //dumpData("testdb");
    //getWholeChat("test");
    //console.log("collectionArr:"+collectionArr);
    const dost = () => {
        let var2 = getCollectionNames("test");
    }

    const callMe = async () =>{
        var x = await dost();
        console.log("X success:"+x);
    }
    
    callMe();
    
    res.status(200).json("collectionArr");
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
   // new Promise((resolve, reject) => {
    console.log("Start of getCollectionNames");
    //var localchatWindowArr;
    async function dos(){
    var testPromise = await regProfile.findOne({ userName: userName });
    console.log("testPromises:"+testPromise);
    return testPromise;
    }

    var t = dos();
    console.log(t);
    /*
        .then(profileEmail => {
            if (profileEmail) {
                localchatWindowArr = profileEmail.chatWindow; 
                console.log(profileEmail.chatWindow);
                //collectionArr = profileEmail.chatWindow;
                //return profileEmail.chatWindow;
                //resolve(collectionArr = profileEmail.chatWindow);
                //console.log(collectionArr);              
            }
            else {
                res.status(200).json({ response: "Fail",message:"Profile does not exists" });
                //Fail Case
            }
        })
        .catch(err => console.log(err));
    */
   //console.log(testPromise.chatWindow);
   //localchatWindowArr = testPromise.chatWindow;
    //console.log("End of getCollectionNames:" + collectionArr);
    //console.log("TestPromise:"+testPromise);
    //collectionArr = testPromise.chatWindow;
    //return localchatWindowArr;
    //});
}

function getCollectionData(collName) {
    console.log("Start of getCollectionData");
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

    console.log("End of getCollectionData");
    console.log(wholeCollData);
};

async function getWholeChat(userName) {
    console.log("Before calling getCollectionNames");
    var newArr = await getCollectionNames(userName);
    collectionArr = newArr;
    console.log("Testing local return:"+newArr);
    console.log("After calling getCollectionNames");
}

module.exports = router;