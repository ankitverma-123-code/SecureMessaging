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


    var objSent = {
        from:"",
        to:"",
        message:""
    }

    objSent.from = from.value;
    objSent.to = to.value;
    objSent.message = message.value;

    //var jsonFormat = JSON.parse("userName="+userName+"&"+"Password="+Password);
    var jsonFormat = JSON.stringify(objSent); 


    try{
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/chatbox/", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(jsonFormat);    
        //xhttp.send(objSent);
        }
        catch(err){
            console.log("Error"+err);
        }


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