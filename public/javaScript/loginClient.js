var userName = document.getElementById("userName");
var Password = document.getElementById("Password");
var LoginButton = document.getElementById("LoginButton");
LoginButton.onclick = function () {
    console.log(userName.value);
    console.log(Password.value);
}