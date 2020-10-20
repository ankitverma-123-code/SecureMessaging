var userName = document.getElementById("userName");
var Password = document.getElementById("Password");
var LoginButton = document.getElementById("LoginButton");
LoginButton.onclick = function () {
    console.log(userName.value);
    console.log(Password.value);

    var objSent = {
        userName:"",
        Password:""
    }

    objSent.userName = userName;
    objSent.Password = Password;

    var jsonFormat = JSON.parse("userName="+userName+"&"+"Password="+Password);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userName="+userName+"&"+"Password="+Password);    
    //xhttp.send(objSent);

}