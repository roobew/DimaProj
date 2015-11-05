$(document).on('deviceready', function() {
    //console.log("Device ready");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage});
    next();
});

function next(){   
    setTimeout(openFB.api({
                        path: '/me',
                        success: function(user) {
                            localStorage.setItem('loginType','Facebook');
                            localStorage.setItem("userData",JSON.stringify(user));
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
                                localStorage.setItem('loginType','Google');
                                localStorage.setItem("userData",JSON.stringify(user));                                    
                                document.location.href="home.html";                                   
                            }).fail(function() {
                                //handle rentMe Login else
                                window.location.href="login.html";
                            });                                           
                        }
                    }),1500);
}