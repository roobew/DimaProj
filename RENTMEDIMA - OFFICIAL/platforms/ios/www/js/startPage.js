var recuperoOpen=false;
var schermataUno=true;

$(document).ready(function() {
    console.log("START PAGE");
    
    
    $(".bottomDiv").click(function (){
        console.log("SPOSTO");
        $("#divEsterno").toggleClass("changePage"); 

        if(schermataUno==true){
            //SOno il registrazione, vado in login   
            $("#nameReg").val("");
            $("#surnameReg").val("");
            $("#emailReg").val("");
            $("#passwordReg").val("");
            
            schermataUno=false;
        }
        else{
            //Sono in login, vado in registrazione   
            $("#emailLogin").val("");
            $("#passwordLogin").val("");
        
        }
        
        if(recuperoOpen==true){
            chiudiRecuperaPassword();   
        }
    }); 
            
    $("#pwDimenticataText").click(function(){
        apriRecuperaPassword();
    });
            
    $("#chiudiRecuperaPasswordButton").click(function(){
        chiudiRecuperaPassword();
    });

    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
    
});
            
      
function apriRecuperaPassword(){
                recuperoOpen=true;
                
                $("#recuperaPasswordDiv").fadeIn();      
                $("#loginForm").animate({opacity: "0.2"}, function(){
                    $( "#userEmailLogin" ).prop( "disabled", true );   
                    $( "#userPasswordLogin" ).prop( "disabled", true );   
                    $( "#loginButton" ).prop( "disabled", true );   
                });       
        }
        
function chiudiRecuperaPassword(){
            recuperoOpen=false;
     
    
            $("#recuperaPasswordDiv").fadeOut();      
            $("#loginForm").animate({opacity: "1"}, function(){
                $( "#userEmailLogin" ).prop( "disabled", false );   
                $( "#userPasswordLogin" ).prop( "disabled", false );   
                $( "#loginButton" ).prop( "disabled", false );   
                $("#emailForgotten").val("");
            });   
        }

 
function facebookLogin() {
    openFB.login(
        function(response) {
            console.log("11111");
            if(response.status === 'connected') {    
                console.log("22222");
                openFB.api({
                    path: '/me',
                    success: function(user) {    
                        console.log("33333");
                        console.log(user);
                        myUrl=  "http://rentme.altervista.org/login.php?"       +
                                "id="           +   user.id                     +
                                "&name="        +   user.first_name             +
                                "&surname="     +   user.last_name              +
                                "&email="       +   user.email                  +
                                "&loginType="   +   'Facebook'                  +
                                "&token="       +   localStorage.fbAccessToken  +
                                "&picture="     +   String(user.picture.data.url).replace(/&/gi,'%26')      ; 
                        console.log("url:"+myUrl);
                        xhttp = new XMLHttpRequest;
                        xhttp.open("GET", myUrl, false);
                        xhttp.send();                    
                        jUser=xhttp.response;  
                        if(JSON.parse(jUser).uRentMe!=null){
                            console.log("dentro");
                            localStorage.setItem("userData",jUser);
                            setTimeout(function(){
                                        window.location.href="new_home.html";
                            },50);                          
                        }else{  
                            navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);    
                            console.log("!!! ERRORE !!!");
                            //navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);
                            //navigator.notification.alert("ciao",null,"titolo");
                            //alert("ops");
                            //alert(JSON.parse(jUser).message);
                        }
                    },
                    error:function(result){ 
                        console.log("errore trovato!!!");
                        console.log(result);
                    }                                
                });
            } else {
                console.log('Facebook login failed: ' + response.error);
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
                if(JSON.parse(jUser).uRentMe!=null){
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
    
    if(correctLoginValue()==false){
        
        $('#modalLogin').modal({
            show: 'true'
        }); 
        
        $("#loginText").text("Inserisci dei valori validi");
        //alert("Inserisci i valori");  
    }
    else{
        console.log("tutto ok");

        myUrl=  "http://rentme.altervista.org/login.php?" +                
                "email="       +   document.getElementById('emailLogin').value      +
                "&loginType="   +   'rentMe'                                    +
                "&password="    +   document.getElementById('passwordLogin').value   ;                        
        xhttp = new XMLHttpRequest;
        xhttp.open("GET", myUrl, false);
        xhttp.send();
        jUser=xhttp.response;
        if(JSON.parse(jUser).uRentMe!=null){
            console.log("dentro");
            localStorage.setItem("userData",jUser);
            setTimeout(function(){
                        window.location.href="new_home.html";
            },50);                          
        }else{                   
            navigator.notification.alert(JSON.parse(jUser).message, reload, JSON.parse(jUser).title);    
        }
    }
}

function correctLoginValue(){
    var emailValue=$("#emailLogin").val();   
    var passwordValue=$("#passwordLogin").val();   
    
    console.log("Email: "+emailValue+ " e Password: "+passwordValue);
    
    if(emailValue=="" || passwordValue==""){
       return false; 
    }
    
    return true;
}

function register(){   
    console.log("dentro register");
    
    if(correctRegistrationValue()==false){
        
        $('#modalReg').modal({
            show: 'true'
        }); 
        
        $("#regText").text("Inserisci dei valori validi");
        
        //alert("Campi registrazione vuoti");   
    }
    else{
        
        console.log("Campi registrazione pieni");

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
        if(JSON.parse(jUser).uRentMe!=null){        
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
}

function correctRegistrationValue(){
    var nomeValue=$("#nameReg").val();   
    var cognomeValue=$("#surnameReg").val();   
    var emailValue=$("#emailReg").val();   
    var passwordValue=$("#passwordReg").val();  
    
    if(nomeValue=="" || cognomeValue=="" || emailValue=="" || passwordValue==""){
        return false;   
    }
    
    return true;
}

function reload(){
    console.log("RELOAD");
     setTimeout(function(){         
            window.location.reload(true);
        },50);
}

function recoverPassword(){
    console.log("recupero password");
    var miaEmail = document.getElementById('emailForgotten').value ;
    //console.log(miaEmail);
    
    if(miaEmail==""){
        $("#recuperoPasswordText").text("Inserisci una email valida.");
    }
    else{
        
        myUrl=  "http://rentme.altervista.org/recoverPassword.php?emailToRetrieve="+miaEmail; 
    
        var myRequest = new XMLHttpRequest();
        myRequest.addEventListener("load", transferComplete);
        myRequest.addEventListener("error", transferFailed);
        myRequest.open("GET", myUrl);
        myRequest.send();                    
        
        $("#recuperoPasswordText").text("Ti abbiamo inviato una email per il recupero della password.");        
        
        /*
        $.ajax({
           
            method: "POST",
            //dataType: "json", //type of data
            crossDomain: true,
            url: "http://rentme.altervista.org/recoverPassword.php", //Relative or absolute path to file.php file
            data: {emailToRetrieve:miaEmail},

            success: function(response) {
                
                alert("Ti abbiamo inviato una mail per recupero della password.");

                window.location.href="startPage.html";
            },

            error: function(request,error)
            {
                console.log(request+":"+error);
            }
        });*/
  
    }
    
    /*
    if(JSON.parse(jUser).uRentMe!=null){                                
        localStorage.setItem("userData",jUser);
        setTimeout(function(){
                    window.location.href="new_home.html";
        },50);                          
    }else{                                                                 
        setTimeout(function(){
            window.location="startPage.html";
        },100);    
    }          */              
    
   
}

function transferFailed(evt) {
    console.log("Si è verificato un errore. Riprova per favore.");
    window.location="startPage.html";
}

function transferComplete () {
    var myResult=this.responseText;       
    console.log(myResult);
}
