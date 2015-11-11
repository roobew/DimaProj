$(document).ready(function(){
    console.log("LOGIN");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
});



function login(){
    //richiesta a server esterno
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", "http://rentme.altervista.org/prova.php?email=ciaoihdd", false);
    xhttp.send();
    console.log(xhttp.responseText);
}


function signUp(){
    console.log("signup");
    window.location.href="signUp.html";    
} 