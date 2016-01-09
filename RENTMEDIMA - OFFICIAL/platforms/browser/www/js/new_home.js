$(document).ready(setField);

function GoogleMap(){
    this.initialize = function(position){
        console.log("maps");
        var map = showMap(position);
        //addMarkersToMap(map,Lat,Lng);
    }
/* 
   var addMarkersToMap = function(map,position){
        var latitudeAndLongitudeOne = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

        var accuracy = new google.maps.Marker({
            position: latitudeAndLongitudeOne,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 20,
                fillColor: 'lightblue',
                fillOpacity: 0.8,
                strokeColor: 'blue',
                strokeWeight: 1
            },
        });
        var point = new google.maps.Marker({
            position: latitudeAndLongitudeOne,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 3,
                fillColor: 'blue',
                fillOpacity: 1,
                strokeColor: 'blue',
                strokeWeight: 0
            },
        });

        var latitudeAndLongitudeTwo = new google.maps.LatLng('45.576622', '9.227743');
        console.log(latitudeAndLongitudeOne);
        console.log(latitudeAndLongitudeTwo.lat);
        var markerTwo = new google.maps.Marker({
        position: latitudeAndLongitudeTwo,
        map: map
        });
    }
*/
    var showMap = function(position){
        console.log("showmap");
            var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            enableHighAccuracy: true
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        var accuracy = new google.maps.Marker();
        var point = new google.maps.Marker();
        setInterval(function(){
            var currentPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);        
            if(map.getZoom()>16){
                accuracy.setOptions({
                    position: currentPosition,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: position.coords.accuracy*2*19/map.getZoom(),
                        fillColor: 'lightblue',
                        fillOpacity: 0.15,
                        strokeColor: 'lightblue',
                        strokeWeight: 1
                    },
                });      
            }
            point.setOptions({
                position: currentPosition,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5*16/map.getZoom(),
                    fillColor: 'lightblue',
                    fillOpacity: 1,
                    strokeColor: 'blue',
                    strokeWeight: 5*16/map.getZoom()
                },
            });
            console.log(map.getZoom());
            console.log(
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +          
                'Accuracy: '          + position.coords.accuracy          + '\n' +         
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n'
            );
        },1000);
        return map;
    }
}

function setField(){
    // ICONE HOME SELEZIONATE
    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab");
    
    // CONTENTPAGEDIV NASCOSTI, TRANNE HOME 
    $(".contentPageDiv").hide();
    $("#homeContent").show();
    
    $("#my-menu").mmenu({
            slidingSubmenus: false
          }, {
             // configuration
             classNames: {
                vertical: "expand",
                selected: "active"
             }
          });
    
    enableSwiperHome();
    
            /*var swiperUno = $('#swiperContainer1').swiper({
                mode: 'horizontal',
                watchActiveIndex: true,
                loop: true,
                onSlideChangeStart: function (swiper) {
                    console.log('slide change start - before');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //before Event use it for your purpose
                },
                onSlideChangeEnd: function (swiper) {
                    console.log('slide change end - after');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //after Event use it for your purpose
                    if (swiper.activeIndex == 1) {
                        //First Slide is active
                        console.log('First slide active')
                    }
                }
            });*/
        
           /* var swiperDue = $('#swiperContainer2').swiper({
                mode: 'horizontal',
                watchActiveIndex: true,
                loop: true,
                onSlideChangeStart: function (swiper) {
                    console.log('slide change start - before');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //before Event use it for your purpose
                },
                onSlideChangeEnd: function (swiper) {
                    console.log('slide change end - after');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //after Event use it for your purpose
                    if (swiper.activeIndex == 1) {
                        //First Slide is active
                        console.log('First slide active')
                    }
                }
            });
    */
         
    
    $(".myColumn").click(function(){
        // RIMUOVI TUTTI I TAB SELEZIONATI
        $(".myColumn").find("p").removeClass("selectedTab");
        
        var pressedId=$(this).attr("id");
        
        // NASCONDI TUTTI I CONTENTPAGEDIV
        $(".contentPageDiv").hide();
        window.scrollTo(0,0);
        if(pressedId=="cercaTab"){
            $("#cercaContent").show();
            console.log("Premuto cerca"); 
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
        else if(pressedId=="affittaTab"){
            
            $("#affittaContent").show();
            console.log("Premuto affitta"); 
            enableSwiperAffitta();
        }
        else if(pressedId=="homeTab"){
            $("#homeContent").show();
            console.log("Premuto home"); 
            enableSwiperHome();
        }
        else if(pressedId=="preferitiTab"){
            $("#preferitiContent").show();
            console.log("Premuto preferiti"); 

            //swipeDetection();
        }
        else if(pressedId=="messaggiTab"){
            $("#messaggiContent").show();
            console.log("Premuto messaggi"); 
        }
        else{
            console.log("error");   
        }
        $(this).find("p").addClass("selectedTab");
    });

    
}

function onSuccess (position) {
   /* navigator.notification.alert(                    
        'Latitude: ' + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n',null,"GEOLOCATION");*/
    var map = new GoogleMap();
    map.initialize(position);                
}       
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function enableSwiperAffitta(){
    var swiperTre = new Swiper ('#swiperAffitta', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            
            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '#nextStepButton',
            prevButton: '#affittaBackButton',
        });   
}

function enableSwiperHome(){
    var swiperUno = new Swiper ('#swiperHome1', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:2500,
            autoplayDisableOnInteraction:false,
          });
          
    var swiperDue = new Swiper ('#swiperHome2', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:3000, 
            autoplayDisableOnInteraction:false,
          });   
}

function swipeDetection(){
    $("li").append("<button class='draggable ui-widget-content'>Button</button>");
    
     $("#ciao").draggable({ revert: "valid" });
    
    $("li").on("swipeleft",function(){
        console.log("SWIPE DETECTED");
        
       
    });
    //$(".ciao").click(function (){console.log("ciao");});

}



