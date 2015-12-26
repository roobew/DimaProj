$(document).ready(getInfo);

function getInfo(){ 
        
    console.log("home");
    myUser= JSON.parse(localStorage.getItem("userData"));
    console.log(myUser);
    $("#uloginType").html(myUser.loginType);   
    $("#uId").html(myUser.id);   
    $("#uName").html(myUser.name);   
    $("#uSurname").html(myUser.surname);   
    $("#uMail").html(myUser.email);
    $("#uToken").html(myUser.token);
    $("#uImg").attr('src',myUser.picture);
    
}

function logout() {
    console.log("Logout function");
    myUser= JSON.parse(localStorage.getItem("userData"));
    /*myUrl=  "http://rentme.altervista.org/logout.php?"       +
                        "id="           +   myUser.id                     +                
                        "&email="       +   myUser.email                  ;       
    console.log(myUser);
                xhttp = new XMLHttpRequest;
                xhttp.open("GET", myUrl, false);
                xhttp.send();*/                                
    if(myUser.loginType=='Google'){
        console.log("GOOGLE LOGOUT");
        $.post('https://accounts.google.com/o/oauth2/revoke', {
                    token: localStorage.access_token
            })
            .done(function(data) {
                    console.log("Token rimosso, LocalStorage pulito, Redirect a Index");
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
        if(myUser.loginType=='Facebook'){ 
            console.log("FACEBOOK LOGOUT");
            openFB.init({appId: '867006893383189', tokenStore: window.localStorage});
            openFB.logout(
                function() {
                    localStorage.clear();
                    console.log("OpenFb Logout, LocalStorage pulito, Redirect a Index");
                    window.location.href="index.html";
                });
        }else
             if(myUser.loginType=='rentMe'){ 
                 console.log("RentMe Logout");
                 localStorage.clear();
                 console.log("LocalStorage pulito, Redirect a Index");
                 window.location.href="index.html";
             }
        
} 
/*
$(document).on('swipeleft', '.ui-page', function(event){    
    if(event.handled !== true) // This will prevent event triggering more then once
    {    
        var nextpage = $.mobile.activePage.next('[data-role="page"]');
        // swipe using id of next page if exists
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
        }
        event.handled = true;
    }
    return false;         
});

$(document).on('swiperight', '.ui-page', function(event){     
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
        }
        event.handled = true;
    }
    return false;            
});
*/
