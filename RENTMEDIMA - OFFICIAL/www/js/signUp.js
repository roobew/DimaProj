$(document).ready(function(){
    console.log("LOGIN");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
});

function register(){  
    myUrl=  "http://rentme.altervista.org/login.php?" +                
            "&name="        +   document.getElementById('name').value       +
            "&surname="     +   document.getElementById('surname').value    +
            "&email="       +   document.getElementById('email').value      +
            "&loginType="   +   'rentMe'                                    +
            "&password="    +   document.getElementById('password').value   ;                        
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
    jUser=xhttp.response;
    localStorage.setItem("userData",jUser);
    window.location.href="home.html";
    
}

