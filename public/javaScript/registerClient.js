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
    xhttp.onload = function(){
        var response = JSON.parse(this.responseText);
        console.log(response);
        if(response.logInfo=="Fail"){
            console.log("Username exists");
        }else if(response.logInfo=="Success"){
            console.log("Registration success");
            window.location.href = "http://localhost:3000/login";
        }
    }
    xhttp.open("POST", "/register/", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(jsonFormat);    
    }
    catch(err){
        console.log("Error"+err);
    }
}
