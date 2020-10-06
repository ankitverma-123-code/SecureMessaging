const express = require('express');
var path = require('path');

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 3000);

// Create router
//var router = require('./router');

// Router listens on / (root)
//app.use('/', router);
app.use(express.static('app'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

app.get('/register',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'register.html'));
})

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'login.html'));
})

app.get('/reset',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'reset.html'));
})

app.get('/chatbox',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'chatbox.html'));
})

// Connect to the database, then execute the "callback" function (in this case an anonymous function which starts listening for requests).
    // Start listening for requests on the port defined earlier
app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port') );
});