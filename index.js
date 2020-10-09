const express = require('express');
//var database = require('./database');
var mongo = require('mongodb');
const mongoose = require("mongoose");

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 3000);

const configFile = require('./myUrl.js');
const db = configFile.mongoURL+configFile.userName+":"+configFile.password+configFile.restUrl;

mongoose
  .connect(db)
  .then(()=>console.log("Connected Successfully"))
  .catch(err=>console.log(err));

// Router listens on / (root)
var route = require('./router');
app.use('/', route);
const register = require('./app/router/register');
app.use("/register/",register);
const login = require('./app/router/login');
app.use("/login/",login);
const reset = require('./app/router/reset');
app.use('/reset/',reset);
const chatbox = require('./app/router/chatbox');
app.use('/chatbox/',chatbox);

app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port') );
});