//const { send } = require("../..");
window.onload = function () {
    socket.emit('chat', {
        from: "fromUser Message check",
        to: "toUser Message check",
        message: "message check 123"
    });
}

var socket = io.connect('http://localhost:3000');

var from = document.getElementById("fromUser");
var to = document.getElementById("toUser");
var message = document.getElementById("messageUser");
var sendButton = document.getElementById("sendButton");
sendButton.onclick = function () {
    console.log(from.value);
    console.log(to.value);
    console.log(message.value);
}


/*
sendbutton.addEventListener('click',function(){
    socket.emit('chat',{
        from:"from",
        to:"to",
        message:"message"
    });
});
*/

/*
message.addEventListener('keypress',function(){
    socket.emit('typing',from);
});
*/


socket.on('chat', function (data) {
    console.log(data);
});

socket.on('typing', function (data) {
    console.log("Typing a message");
})