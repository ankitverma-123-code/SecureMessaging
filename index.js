const express = require('express');
//var database = require('./database');
var mongo = require('mongodb');

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 3000);

// Router listens on / (root)
var route = require('./router');
app.use('/', route);



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://RajGM:Gaurav@123todatabase@cluster0.mwzax.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// Connect to the database, then execute the "callback" function (in this case an anonymous function which starts listening for requests).
// Start listening for requests on the port defined earlier

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
*/


    app.listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
        console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port') );
    });


