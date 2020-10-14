const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/',function(req,res){
    dumpData("testdb");
    res.status(400).json({ pro: "data" });
})

function dumpData(DBname) {
    var MongoClient = require('mongodb').MongoClient;
    const configFile = require('./../../myUrl');

    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        
        /*
        console.log("Getting db");
        console.log(db);

        var dbo = db.db("testdb");
        console.log("Getting dbo");
        console.log(dbo);
        
        console.log( db.getCollectionNames() ); 
        console.log( dbo.getCollectionNames() ); 
        */

        //var dbo = db.db("testdb");
        //console.log( dbo.getCollectionInfos() );
        
        db.close();
    });
}

module.exports = router;