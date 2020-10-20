var userName = document.getElementById("userName");
var Password = document.getElementById("Password");
var CPassword = document.getElementById("cPassword");
var RegisterButton = document.getElementById("RegisterButton");
RegisterButton.onclick = function () {
    console.log(userName.value);
    console.log(Password.value);
    console.log(CPassword.value);
}