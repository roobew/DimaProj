$(document).ready(function(){
    console.log("LOGIN");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage}); 
});

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
                localStorage.setItem('loginType','Google');
                localStorage.setItem("userData",JSON.stringify(user));  
                window.location.href="home.html";
            }).fail(function() {
                //handle error
            });
        }).fail(function(data) {
            //Show an error message if access was denied            
        });   
}
        
function facebookLogin() {
    openFB.login(
        function(response) {
            if(response.status === 'connected') {               
                openFB.api({
                    path: '/me',
                    success: function(user) {
                        //salvare nel DB su rentMe.altervista anche il token    
                        localStorage.setItem('loginType','Facebook');
                        localStorage.setItem("userData",JSON.stringify(user));
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

function login(){
    
}

function SignUp(){
    
} 