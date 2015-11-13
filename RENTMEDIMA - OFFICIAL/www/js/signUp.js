$(document).ready(function(){
    console.log("LOGIN");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
    document.getElementById("email").value = 'ciao';
    
    
});

function facebookLogin() {
    openFB.login(
        function(response) {
            if(response.status === 'connected') {               
                openFB.api({
                    path: '/me',
                    success: function(user) {                                    
                        myUrl=  "http://rentme.altervista.org/login.php?"       +
                                "id="           +   user.id                     +
                                "&name="        +   user.first_name             +
                                "&surname="     +   user.last_name              +
                                "&email="       +   user.email                  +
                                "&loginType="   +   'Facebook'                  +
                                "&token="       +   localStorage.fbAccessToken  +
                                "&picture="     +   String(user.picture.data.url).replace(/&/gi,'%26')      ;                        
                        
                        xhttp = new XMLHttpRequest;
                        xhttp.open("GET", myUrl, false);
                        xhttp.send();                    
                        jUser=xhttp.response;
                        localStorage.setItem("userData",jUser);

                        window.location.href="home.html";
                        
                    },
                    error:function(result){  
                        console.log(result);
                    }                                
                });
            } else {
                alert('Facebook login failed: ' + response.error);
            }
        }, {scope: 'email'});
                        
}

function googleLogin(){    
        googleapi.authorize({client_id: app_google.client_id,
            client_secret: app_google.client_secret,
            redirect_uri: app_google.redirect_uri,
            scope: app_google.scope
        }).done(function() {           
            googleapi.getToken({
                client_id: app_google.client_id,
                client_secret: app_google.client_secret
            }).then(function(data) {
                //Pass the token to the API call and return a new promise object
                return googleapi.userInfo({ access_token: data.access_token });
            }).done(function(user) {
                //salvare nel DB su rentMe.altervista anche il token 
            
               
                //console.log("salvo nel db");                    
                myUrl=  "http://rentme.altervista.org/login.php?"       +
                        "id="           +   user.id                     +
                        "&name="        +   user.given_name             +
                        "&surname="     +   user.family_name            +
                        "&email="       +   user.email                  +
                        "&loginType="   +   'Google'                    +
                        "&token="       +   localStorage.access_token   +
                        "&picture="     +   String(user.picture).replace(/&/gi,'%26')      ;                        
                xhttp = new XMLHttpRequest;
                xhttp.open("GET", myUrl, false);
                xhttp.send();
                jUser=xhttp.response;
                localStorage.setItem("userData",jUser);
                   
                window.location.href="home.html";
            }).fail(function() {
                //handle error
            });
        }).fail(function(data) {
            //Show an error message if access was denied            
        });   
}

function register(){  
    myUrl=  "http://rentme.altervista.org/registration.php?" +                
            "name="        +   document.getElementById('name').value       +
            "&surname="     +   document.getElementById('surname').value    +
            "&email="       +   document.getElementById('email').value      +
            "&loginType="   +   'rentMe'                                    +
            "&password="    +   document.getElementById('password').value   ;                        
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
    jUser=xhttp.response;
    console.log(jUser);
    if(JSON.parse(jUser).id!=null){
        console.log("dentro");
        localStorage.setItem("userData",jUser);
        //$.mobile.loadPage("home.html"); 
        //$.mobile.changePage('home.html');
        setTimeout(function(){
                    window.location="home.html";
            
        },50);
        //window.open("home.html","_self");
    
    }else{         
        console.log("error");
       //$.mobile.changePage("#");
        //$.mobile.changePage('signUp.html',{reload : true});
        setTimeout(function(){
            window.location="signUp.html";
            
        },100);    

        //loadPage("signUp.html");
        //window.open("signUp.html","_self");
        console.log("error");
    }
    
}


