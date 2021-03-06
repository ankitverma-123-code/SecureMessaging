var socket = io.connect('http://localhost:3000');
var from = document.getElementById("fromUser");
var to = document.getElementById("toUser");
var message = document.getElementById("messageUser");
var sendButton = document.getElementById("sendButton");
var output = document.getElementById("output");
var messageBlock = document.getElementById("messageUser");
if(sessionStorage.getItem("userName")===null && sessionStorage.getItem("authTokenuserName")===null){
    window.location.href = "http://localhost:3000/login";
}else{
    from.value = sessionStorage.getItem("userName");
}
sendButton.onclick = function () {
    /*
    console.log(from.value);
    console.log(to.value);
    console.log(message.value);
    console.log("authToken:"+sessionStorage.getItem("authToken"));
    console.log(socket.id);
    */

    var objSent = {
        from:"",
        to:"",
        message:"",
        authToken:"",
        socketID:""
    }

    objSent.from = from.value;
    objSent.to = to.value;
    objSent.message = message.value;
    objSent.authToken = sessionStorage.getItem("authToken");
    objSent.socketID = socket.id;

    var jsonFormat = JSON.stringify(objSent); 

    try{
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            var response = JSON.parse(this.responseText);
            console.log(response);
            message.value="";
        }
        xhttp.open("POST", "/chatbox/", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(jsonFormat);    
        socket.emit('chat',{
            from:objSent.from,
            to:objSent.to,
            message:objSent.message,
            authToken:sessionStorage.getItem("authToken"),
            socketID:objSent.socketID
        });
        }
        catch(err){
            console.log("Error"+err);
        }
}

messageBlock.addEventListener('keypress',function(){
    socket.emit('typing',from.value);
});

socket.on('typing', function (data) {
    console.log("Typing a message");
});

socket.on('chat', function (data) {
    console.log(data);
    output.innerHTML+='<p><strong>'+data.message+'</strong></p>';
});