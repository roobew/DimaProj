$(document).ready(function(){
    console.log("start");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
});

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
        //console.log($.getJSON('https://www.googleapis.com/plus/v1/people/me', options));
        //return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);

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

function googleLogin(){
    console.log("GOOGLE BUTTON PRESSED");
    //Show the consent page
        googleapi.authorize({client_id: app_google.client_id,
            client_secret: app_google.client_secret,
            redirect_uri: app_google.redirect_uri,
            scope: app_google.scope
        }).done(function() {
            //Get the token, either from the cache
            //or by using the refresh token.
            googleapi.getToken({
                client_id: app_google.client_id,
                client_secret: app_google.client_secret
            }).then(function(data) {
                //Pass the token to the API call and return a new promise object
                return googleapi.userInfo({ access_token: data.access_token });
            }).done(function(user) {
                //console.log(user);
                
                //Show the greet view if we get a valid token
                console.log("User Loggato");
                var myArray = [user.given_name, user.family_name, user.email, user.picture, localStorage.access_token];            

                var link="home_google.html?name="+myArray[0]+"&surname="+myArray[1]+"&email="+myArray[2]+"&picture="+myArray[3]+"&token="+myArray[4];
                //localStorage.clear();

                window.location.href=link;
            }).fail(function() {
                //If getting the token fails, or the token has been
                //revoked, show the login view.
                console.log("errore cazzo!!1!1!!");
            });
        }).fail(function(data) {
            //Show an error message if access was denied
            $('#errorMessage').html(data.error);
        });   
}
        
function facebookLogin() {
    openFB.login(
        function(response) {
            if(response.status === 'connected') {
                //salvo nel DB
               var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", "http://rentme.altervista.org/success.php?access_token='"+response.authResponse.accessToken+"'", true ); // false for synchronous request
                xmlHttp.send( null );

                window.location.href="home_fb.html";
                //alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
               // openFB.tokenStore =  response.authResponse;
                //console.log(openFB.tokenStore.fbAccessToken);
            } else {
                alert('Facebook login failed: ' + response.error);
            }
        }, {scope: 'email'});
}

/*function getInfo() {
    openFB.api({
        path: '/me',
        success: function(data) {
            console.log("DATI:" + JSON.stringify(data));
            document.getElementById("userName").innerHTML = data.first_name +" " + data.last_name;
            document.getElementById("email").innerHTML = data.email;
            //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
        },
        error: errorHandler});
}
function share() {
    openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: document.getElementById('Message').value || 'Testing Facebook APIs'
        },
        success: function() {
            alert('the item was posted on Facebook');
        },
        error: errorHandler});
}

function readPermissions() {
    openFB.api({
        method: 'GET',
        path: '/me/permissions',
        success: function(result) {
            alert(JSON.stringify(result.data));
        },
        error: errorHandler
    });
}

function revoke() {
    openFB.revokePermissions(
            function() {
                alert('Permissions revoked');
            },
            errorHandler);
}

function logout() {
    openFB.logout(
            function() {
                alert('Logout successful');
            },
            errorHandler);
}

function errorHandler(error) {
    console.log(error.message);
}

function getStatus(){
                openFB.api({
                    path: '/me',
                    success: function(data) {
                        document.getElementById("login").hidden=true;
                         document.getElementById("infos").hidden=false;
                         document.getElementById("logout").hidden=false;
                         document.getElementById("revoke").hidden=false;
                    },
                    error: function(data) {
                        document.getElementById("login").hidden=false;
                         document.getElementById("infos").hidden=true;
                         document.getElementById("logout").hidden=true;
                         document.getElementById("revoke").hidden=true;
                    }
                });
            }*/