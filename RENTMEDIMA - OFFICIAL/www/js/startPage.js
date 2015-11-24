$(function() {
    console.log("START PAGE");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
    
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

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
                        if(JSON.parse(jUser).id!=null){
                            console.log("dentro");
                            localStorage.setItem("userData",jUser);
                            setTimeout(function(){
                                        window.location.href="new_home.html";
                            },50);                          
                        }else{                                   
                            navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);      
                        }
                    },
                    error:function(result){ 
                        console.log("errore trovato!!!");
                        console.log(result);
                    }                                
                });
            } else {
                //alert('Facebook login failed: ' + response.error);
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
                myUrl=  "http://rentme.altervista.org/login.php?"       +
                        "id="           +   user.id                     +
                        "&name="        +   user.given_name             +
                        "&surname="     +   user.family_name            +
                        "&email="       +   user.email                  +
                        "&loginType="   +   'Google'                    +
                        "&token="       +   localStorage.access_token   +
                        "&picture="     +   String(user.picture).replace(/&/gi,'%26')                      ;                        
                xhttp = new XMLHttpRequest;
                xhttp.open("GET", myUrl, false);
                xhttp.send();
                jUser=xhttp.response;
                if(JSON.parse(jUser).id!=null){
                    console.log("dentro");
                    localStorage.setItem("userData",jUser);
                    setTimeout(function(){
                                window.location.href="new_home.html";
                    },50);                          
                }else{         
                    navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);       
                }                
            }).fail(function() {
                //handle error
            });
        }).fail(function(data) {
            //Show an error message if access was denied            
        });   
}

// Funziona, a parte il messaggio di errore che si intravede
function login(){
    //console.log("Dentro login function");
  myUrl=  "http://rentme.altervista.org/login.php?" +                
            "email="       +   document.getElementById('emailLogin').value      +
            "&loginType="   +   'rentMe'                                    +
            "&password="    +   document.getElementById('passwordLogin').value   ;                        
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
    jUser=xhttp.response;
    if(JSON.parse(jUser).id!=null){
        console.log("dentro");
        localStorage.setItem("userData",jUser);
        setTimeout(function(){
                    window.location.href="new_home.html";
        },50);                          
    }else{                   
        navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);    
    }
}

function register(){   
    console.log("dentro register");
    myUrl=  "http://rentme.altervista.org/registration.php?" +                
            "name="        +   document.getElementById('nameReg').value       +
            "&surname="     +   document.getElementById('surnameReg').value    +
            "&email="       +   document.getElementById('emailReg').value      +
            "&loginType="   +   'rentMe'                                    +
            "&password="    +   document.getElementById('passwordReg').value   ;                       
    console.log("ciaaaaaooo!!11!!");

    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
    jUser=xhttp.response;
    if(JSON.parse(jUser).id!=null){        
        localStorage.setItem("userData",jUser);  
        setTimeout(function(){
                    window.location.href="new_home.html";            
        },50);    
    }else{     
        console.log("ERROR");
        console.log(jUser);  
        navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);    
    }
    
}

function reload(){
    console.log("RELOAD");
     setTimeout(function(){         
            window.location.reload(true);
        },50);
}