//const { send } = require("../..");
var socket = io.connect('http://localhost:3000');

var from = "";
var to = "";
var message = "";
var sendbutton = document.getElementById("Send");
var x = document.getElementById("Send");

/*
sendbutton.addEventListener('click',function(){
    socket.emit('chat',{
        from:"from",
        to:"to",
        message:"message"
    });
});
*/

window.onload = function(){
    socket.emit('chat',{
        from:"from",
        to:"to",
        message:"message"
    });
}

/*
message.addEventListener('keypress',function(){
    socket.emit('typing',from);
});
*/

socket.on('chat',function(data){
    console.log(data);
});

socket.on('typing',function(data){
    console.log("Typing a message");
})