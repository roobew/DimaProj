var googleapi = {
    setToken: function(data) {
        //Cache the token
        localStorage.access_token = data.access_token;
        //Cache the refresh token, if there is one
        localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
        //Figure out when the token will expire by using the current
        //time, plus the valid time (in seconds), minus a 1 minute buffer
        var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
        localStorage.expires_at = expiresAt;
    },
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope,
        });
        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=yes,clearcache=yes');


        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        authWindow.addEventListener('loadstart', googleCallback);
        function googleCallback(e){
            var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    googleapi.setToken(data);
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        }

        return deferred.promise();
    },
    getToken: function(options) {
        var deferred = $.Deferred();

        if (new Date().getTime() < localStorage.expires_at) {
            deferred.resolve({
                access_token: localStorage.access_token
            });
        } else if (localStorage.refresh_token) {
            $.post('https://accounts.google.com/o/oauth2/token', {
                refresh_token: localStorage.refresh_token,
                client_id: options.client_id,
                client_secret: options.client_secret,
                grant_type: 'refresh_token'
            }).done(function(data) {
                googleapi.setToken(data);
                deferred.resolve(data);
            }).fail(function(response) {
                deferred.reject(response.responseJSON);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise();
    },
    userInfo: function(options) {
        return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);

    }
};
 
var app_google = {
    client_id: '203779998941-63pk775v188tvi0cqjkcui7a64omgr0g.apps.googleusercontent.com',
    client_secret: 'zQ3wzdhV_AHjK8ir2WLGSGMY',
    redirect_uri: 'http://localhost',
    scope: 'profile email', 
 
/*    init: function() {
        console.log("QUIII111111!");
        $('#googleLogin').on('click', function() {
            console.log("cliccato");
            app_google.onLoginButtonClick();
        });

        //Check if we have a valid token
        //cached or if we can get a new
        //one using a refresh token.
        
    },
    showLoginView: function() {
        $("#loginArea").show();
    },
    showGreetView: function() {
        $("#loginArea").hide();  
    },
    onLoginButtonClick: function() {}*/
    
}; 

function parseGetVars()
{
  // creo una array
  var args = new Array();
  // individuo la query (cioè tutto quello che sta a destra del ?)
  // per farlo uso il metodo substring della proprietà search
  // dell'oggetto location
  var query = window.location.search.substring(1);
  // se c'è una querystring procedo alla sua analisi
  if (query)
  {
    // divido la querystring in blocchi sulla base del carattere &
    // (il carattere & è usato per concatenare i diversi parametri della URL)
    var strList = query.split('&');
    // faccio un ciclo per leggere i blocchi individuati nella querystring
    for(str in strList)
    {
      // divido ogni blocco mediante il simbolo uguale
      // (uguale è usato per l'assegnazione del valore)
      var parts = strList[str].split('=');
      // inserisco nella array args l'accoppiata nome = valore di ciascun
      // parametro presente nella querystring
      args[unescape(parts[0])] = unescape(parts[1]);
    }
  }
  return args;
}


$(document).ready(getInfo);

function getInfo(){
    //var utente=googleapi.userInfo({ access_token: localStorage.access_token });
    googleapi.getToken({
                client_id: app_google.client_id,
                client_secret: app_google.client_secret
            }).then(function(data) {
                //Pass the token to the API call and return a new promise object
                return googleapi.userInfo({ access_token: localStorage.access_token });
            }).done(function(user) {
                console.log(user);
                console.log("NOME E': "+ user.given_name);
                console.log("EMAIL E': "+ user.email);
            }).fail(function() {
                console.log("BACK TO INDEX");
            });
    
    
}

function getData(){
    console.log("ciao, sono la nuova pagina");
    var get = parseGetVars();
    var myName=get['name'];
    var mySurname=get['surname'];
    var myEmail=get['email'];
    var myPicture=get['picture'];
    var myToken=get['token'];
 
    myUser.setValue(myName, mySurname, myEmail, myPicture, myToken);
    
    $("#nome").html(myUser.firstName);   
    $("#cognome").html(myUser.lastName);   
    $("#email").html(myUser.email);
}
                  
function logoutFunction(){
    console.log("pre-logout");
    
    $.post('https://accounts.google.com/o/oauth2/revoke', {
                    token: localStorage.access_token
                }).done(function(data) {
                    console.log("token rimosso");
                    //localStorage.removeItem('access_token');
                    localStorage.clear();
                    //var link="../index.html";
                    var link="index.html";
            
                    window.location.href=link;
                }).fail(function(response) {
                    console.log("token error");
                });
    
    
    console.log("post-logout");
    
}