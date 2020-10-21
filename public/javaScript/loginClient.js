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

    objSent.userName = userName.value;
    objSent.Password = Password.value;

    //var jsonFormat = JSON.parse("userName="+userName+"&"+"Password="+Password);
    var jsonFormat = JSON.stringify(objSent); 

    try{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login/", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(jsonFormat);    
    //xhttp.send(objSent);
    }
    catch(err){
        console.log("Error"+err);
    }
}


/*
check for 
application/x-www-form-urlencoded
VS
application/json; charset=utf-8
*/