const express = require('express');
var database = require('./database');

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 3000);

// Router listens on / (root)
var route = require('./router');
app.use('/', route);

/*
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://RajGM:GauraV@123todatabase@cluster0.mwzax.mongodb.net/capstonehackmsg?retryWrites=true&w=majority";
var url = "mongodb://localhost:3000/mydb";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
*/
//mongo "mongodb+srv://cluster0.mwzax.mongodb.net/capstonehackmsg" --username RajGM
// Connect to the database, then execute the "callback" function (in this case an anonymous function which starts listening for requests).
// Start listening for requests on the port defined earlier
database(function(){
    app.listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
        console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port') );
    });
});


