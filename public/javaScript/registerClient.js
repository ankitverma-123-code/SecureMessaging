var userName = document.getElementById("userName");
var Password = document.getElementById("Password");
var CPassword = document.getElementById("cPassword");
var RegisterButton = document.getElementById("RegisterButton");
RegisterButton.onclick = function () {
    console.log(userName.value);
    console.log(Password.value);
    console.log(CPassword.value);

    var objSent = {
        userName:"",
        Password:""
    }

    objSent.userName = userName.value;
    objSent.Password = Password.value;

    var jsonFormat = JSON.stringify(objSent); 

    try{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register/", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(jsonFormat);    
    }
    catch(err){
        console.log("Error"+err);
    }
}