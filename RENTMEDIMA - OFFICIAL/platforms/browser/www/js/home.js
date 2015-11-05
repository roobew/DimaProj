$(document).ready(getInfo);

function getInfo(){    
    myUser= JSON.parse(localStorage.getItem("userData"));
    $("#uId").html(myUser.id);   
    $("#uName").html(myUser.first_name||myUser.given_name);   
    $("#uSurname").html(myUser.last_name||myUser.family_name);   
    $("#uMail").html(myUser.email);
    $("#uImg").attr('src',myUser.picture.data.url||myUser.picture);
}

function logout() {
    console.log("logout");
    if(localStorage.getItem('loginType')=='Google'){
        $.post('https://accounts.google.com/o/oauth2/revoke', {
                    token: localStorage.access_token
            })
            .done(function(data) {
                    console.log("token rimosso");
                    //localStorage.removeItem('access_token');
                    localStorage.clear();
                    //var link="../index.html";
                    var link="index.html";
            
                    window.location.href=link;
            })
            .fail(function(response) {
                    console.log("token error");
            });
    }else
        if(localStorage.getItem('loginType')=='Facebook'){    
            openFB.init({appId: '867006893383189', tokenStore: window.localStorage});
            openFB.logout(
                function() {
                    console.log("Logout Successfull");
                    window.location.href="index.html"
                });
        }else{
            
        }
        
}

/*function getStatus(){
                openFB.api({
                    path: '/me',
                    success: function(data) {
                       // document.getElementById("login").hidden=true;
                         document.getElementById("infos").hidden=false;
                         document.getElementById("logout").hidden=false;
                         document.getElementById("revoke").hidden=false;
                    },
                    error: function(data) {
                       // document.getElementById("login").hidden=false;
                         document.getElementById("infos").hidden=true;
                         document.getElementById("logout").hidden=true;
                         document.getElementById("revoke").hidden=true;
                    }
                });
            }
            function login() {
                openFB.login(
                    function(response) {
                        if(response.status === 'connected') {
                            window.location.href="home.html";
                            //alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
                           // openFB.tokenStore =  response.authResponse;
                            //console.log(openFB.tokenStore.fbAccessToken);
                        } else {
                            alert('Facebook login failed: ' + response.error);
                        }
                    }, {scope: 'email'});
            }
            function getInfo() {
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
                            console.log("Permission Revoked");
                             window.location.href="index.html"
                        },
                        errorHandler);
            }
            function logout() {
                openFB.logout(
                        function() {console.log("Logout Successfull");
                            window.location.href="index.html"
                        },
                        errorHandler);
            }
            function errorHandler(error) {
                console.log(error.message);
    }*/