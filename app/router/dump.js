const express = require('express');
const router = new express.Router();
var path = require('path');
const regProfile = require('./../models/profile');
const util = require("util"); //for checking promise states


var collectionList = [];

router.get('/', function (req, res) {
    //dumpData("testdb");
    getWholeChat("test");
    
    getCollectionData("testtest2");
    //res.status(200).json({ pro: "data" });
    res.sendFile(path.join(__dirname + './../views/' + 'dump.html'));
})

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
    var collectionArr=[];
    var promiseState;
    promiseState = regProfile.findOne({ userName: userName })
        .then(profileEmail => {
            if (profileEmail) {
                
                
                for(var i=0;i<profileEmail.chatWindow.length;i++){
                    //collectionArr[i]=profileEmail.chatWindow[i];
                    collectionArr.push(profileEmail.chatWindow[i]);
                    //collectionList.push(profileEmail.chatWindow[i]);
                }
                //console.log(collectionArr);
                
                //displayCollArr("Displaying using callback:"+collectionArr);
            }
            else {
                res.status(200).json({ response: "Fail" });
            }
        })
        .catch(err => console.log(err));

        while(!util.inspect(promiseState).includes("pending")){
        console.log(util.inspect(promiseState).includes("pending"));
        }
        console.log(util.inspect(promiseState).includes("pending"));
        promiseState
        .then(console.log("Printing from promise:"+collectionArr))
        .catch(err=>console.log("Promise unfullfilled"));

        return collectionArr;

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
                .project({timeStamp:0,_id: 0})
                .toArray((err, data) => {
                    if (err) throw err;

                    console.log(data);

                    client.close();
                });
        }
    );

};

function getWholeChat(userName){
    var arr=[];
    arr = getCollectionNames(userName);
    
    console.log(arr);
}

module.exports = router;