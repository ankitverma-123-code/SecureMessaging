const config = require('./config.json');
const mongoose = require('mongoose');

const databaseParameters = config.database;
var dbConnection = "mongodb://";

if (databaseParameters.username && databaseParameters.password  && databaseParameters.username.length > 0 && databaseParameters.password.length > 0) {
    dbConnection += encodeURIComponent(databaseParameters.username) + ":" + encodeURIComponent(databaseParameters.password) + "@";
}
dbConnection += databaseParameters.host + ":" + databaseParameters.port + "/" + databaseParameters.collection;

module.exports = function(callback){
    mongoose.createConnection(dbConnection, { useUnifiedTopology: true,useNewUrlParser: true});
    var db=mongoose.connection;
    
    db.on('connected', function () {
        console.log('Mongoose connected');
    });

    // If the connection throws an error
    db.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
        process.exit(1);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
        process.exit(1);
    });

    db.on('open', function () {
        // This is the crucial part: the function doesn't return a value, as the connection is an asynchronous event
        // Instead it will execute a callback function passed as parameter of the require, which will accept one parameter being the connection
        callback(mongoose);
    });

}