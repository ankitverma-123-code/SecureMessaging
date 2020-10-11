var from = document.getElementById('from').textContent;
var to = document.getElementById('to').textContent;
var msg = document.getElementById('message').textContent;
var sendButton = document.getElementById('send');

sendButton.onClick = function(){sendMessagefun()};

function sendMessagefun(){
console.log("Send Message button clicked");
xhttp.open("POST", "http://localhost:3000/chatbox", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(`from=${from}&to=${to}&message=${msg}`);
}