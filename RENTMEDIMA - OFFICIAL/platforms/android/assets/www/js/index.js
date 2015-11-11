$(document).on('deviceready', function() {
    //console.log("Device ready");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage});
    next();
});

function next(){   
    setTimeout(openFB.api({
                        path: '/me',
                        success: function(user) {
                            var jUser= {id : user.id, 
                                        name : user.first_name,
                                        surname : user.last_name,
                                        email : user.email,
                                        loginType : 'Facebook',
                                        token : localStorage.fbAccessToken,
                                        picture : user.picture.data.url,
                                        };                                
                            localStorage.setItem("userData",JSON.stringify(jUser));
                            window.location.href="home.html";
                        },
                        error: function(data) {                           
                            googleapi.getToken({
                                    client_id: app_google.client_id,
                                    client_secret: app_google.client_secret
                            }).then(function(data) {
                                //Pass the token to the API call and return a new promise object
                                return googleapi.userInfo({ access_token: data.access_token });
                            }).done(function(user) { 
                                var jUser= {id : user.id, 
                                        name : user.given_name,
                                        surname : user.family_name,
                                        email : user.email,
                                        loginType : 'Google',
                                        token : localStorage.access_token,
                                        picture : user.picture,
                                        };     
                                localStorage.setItem("userData",JSON.stringify(jUser));
                                document.location.href="home.html";                                   
                            }).fail(function() {
                                //handle rentMe Login else
                                window.location.href="login.html";
                            });                                           
                        }
                    }),1500);
}