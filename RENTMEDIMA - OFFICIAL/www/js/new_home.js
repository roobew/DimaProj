var preferitiMapInit=false, dettaglioMapInit=false;

var dettaglioAnnuncio_DAPREFERITI=false;
var dettaglioAnnuncio_DAAFFITTA=false;

$(document).ready(setField);

function setField(){
    // ICONE HOME SELEZIONATE
    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab"); 
    
    // CONTENTPAGEDIV NASCOSTI, TRANNE HOME 
    $(".contentPageDiv").hide();
    $("#homeContent").show();    
    
    // INIZIALIZZA JQUERY_MMENU
    $("#my-menu").mmenu({
        slidingSubmenus: false,
        //extensions: ["pagedim-black"]            
    });
    
    $("#back-mmenu").mmenu({
         // options
        slidingSubmenus: false,
        extensions: ["pagedim-black"],
        offCanvas: {
            position: "bottom",
            zposition: "front"
         }
        
    });
    
    $("#caricaFoto-mmenu").mmenu({
         // options
        slidingSubmenus: false,
        extensions: ["pagedim-black"],
        offCanvas: {
            position: "bottom",
            zposition: "front"
         }
        
      });
    
    $("#deleteMessage-mmenu").mmenu({
         // options
        slidingSubmenus: false,
        extensions: ["pagedim-black"],
        offCanvas: {
            position: "bottom",
            zposition: "front"
         }
        
    });
    
    $("#deleteAnnuncio-mmenu").mmenu({
         // options
        slidingSubmenus: false,
        extensions: ["pagedim-black"],
        offCanvas: {
            position: "bottom",
            zposition: "front"
         }
        
    });
    
    $("#modificaAnnuncio-mmenu").mmenu({
         // options
        slidingSubmenus: false,
        extensions: ["pagedim-black"],
        offCanvas: {
            position: "bottom",
            zposition: "front"
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
    $(".myColumn").on("tap", function (){
        // RIMUOVI TUTTI I TAB SELEZIONATI
        $(".myColumn").find("p").removeClass("selectedTab");        
        var pressedId=$(this).attr("id");        
        // NASCONDI TUTTI I CONTENTPAGEDIV
        $(".contentPageDiv").hide();
        
        window.scrollTo(0,0);
        
        if(modificaCliccato==true){
            premiTastoModifica();   
        }
        
        switch(pressedId) {
            case "cercaTab":
                $("#cercaContent").show();
                console.log("Premuto cerca");             
                var map = new GoogleMap();
                map.initialize();
                
                break;
                
            case "affittaTab":
                
                $("#affittaContent").show();
                console.log("Premuto affitta");
                pickAnnunci();
                break;
                
            case "homeTab":
                $("#homeContent").show();
                console.log("Premuto home"); 
                enableSwiperHome();
                
                break;
              
            case "preferitiTab":
                $("#preferitiContent").show();
                console.log("Premuto preferiti"); 

                if(preferitiMapInit==false){    
                    //drawMap("preferitiMap",true);
                    drawMapPreferiti();
                    preferitiMapInit=true;
                }
                
                break;
                
            case "messaggiTab":
                $("#messaggiContent").show();
                console.log("Premuto messaggi");
                
                break;
            
            default:
                console.log("error");
        }
        
        
        $(this).find("p").addClass("selectedTab");
    });
    
    $(".swiper-slide").click(function (){
        if(dettaglioMapInit==false){
            //drawMap("dettaglioMap", false);
            drawMapDettaglio();
            dettaglioMapInit=true;
        }
            
        $("#homeTopRow").hide();
        $("#dettaglioAnnuncioTopRow").show();
        
        nascondiBottomBar();
        
        $(".contentPageDiv").hide();
        $("#pageDettaglioContent").show();
    });
    
    
    // LINK DI HOME TOP ROW
    $("#backLink_fromHome").click(function (){
                
        $("#dettaglioAnnuncioTopRow").hide();
        $("#homeTopRow").show();
        
        mostraBottomBar();
        
        $("#pageDettaglioContent").hide();
        $("#homeContent").show();
        
    });
    
    $("#backLink_fromAffitta").click(function (){
        
        
        $("#dettaglioAnnuncioTopRow_daAffitta").hide();
        $("#homeTopRow").show();
        
        mostraBottomBar();
        
        $("#pageDettaglioContent").hide();
        $("#affittaContent").show();
        
    });
    
    //pickAnnunci();
    
}

function nascondiBottomBar(){
    $("#fixedBottomDiv").hide();
    $("#contentDiv").css("height","90vh");   
}

function mostraBottomBar(){
    $("#contentDiv").css("height","83vh");
    $("#fixedBottomDiv").show();   
}

function enableSwiperHome(){
    var swiperUno = new Swiper ('#swiperHome1', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:3000,
            autoplayDisableOnInteraction:false,
          });
          
    var swiperDue = new Swiper ('#swiperHome2', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            //autoplay:3000, 
            autoplayDisableOnInteraction:false,
          });   
    var swiperDue = new Swiper ('#swiperHome3', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            //autoplay:3000, 
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


/*
function drawMap(mapID, addMark){
    console.log("DISEGNO "+mapID);
    
    var myLatlng;
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(45.4642200,9.1905600)
    }
    var map = new google.maps.Map(document.getElementById(mapID), mapOptions);
    
    if(addMark==true)
        drawMyMarker(map);
    // Funzione in newHome_preferiti.js
    $(window).on('resize',function(){
        console.log("RESIZE di "+mapID);
        google.maps.event.trigger(map, 'resize');
        
    });
}

*/
function drawMapPreferiti(){
    console.log("DISEGNO mappa di preferiti");
    
    var myLatlng;
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(45.4642200,9.1905600)
    }
    var map = new google.maps.Map(document.getElementById('preferitiMap'), mapOptions);
    
    drawMyMarker(map);
    // Funzione in newHome_preferiti.js
   /* $(window).on('resize',function(){
        console.log("RESIZE di "+mapID);
        google.maps.event.trigger(map, 'resize');
        
    });*/
}

function drawMapDettaglio(){
    console.log("DISEGNO mappa di dettaglio");
    
    var myLatlng;
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(45.4642200,9.1905600)
    }
    var map = new google.maps.Map(document.getElementById('dettaglioMap'), mapOptions);
    
    // Funzione in newHome_preferiti.js
   
    google.maps.event.addListenerOnce(map, 'idle', function() {
        console.log("Resize event");
        google.maps.event.trigger(map, 'resize');
    });
}


function pickAnnunci(){
    console.log("pickannunci");
    myUser= JSON.parse(localStorage.getItem("userData"));
    console.log(myUser);
    myUrl=  "http://rentme.altervista.org/pickAnnunci.php?" +                
                "idUser="       +  myUser.uRentMe ;
    console.log("--------------------------");
    console.log("url:" + myUrl);
        xhttp = new XMLHttpRequest;
        xhttp.open("GET", myUrl, false);
        xhttp.send();   
        annunci=xhttp.response;
        if(JSON.parse(annunci)!=null){
            console.log("presi annunci");
            localStorage.setItem("annunci",annunci);
            jAnnunci=JSON.parse(annunci);
            $("#pubblicatiDiv").html("");
            for(i=0;i<jAnnunci.length;i++)
                $("#pubblicatiDiv").append(
                            "<div class='row annuncioListElement'>"+
                            "<div class='annuncioParteUno' onclick='setAnnuncioValue(" + i+ ");'>"+
                            "    <h5 class='titoloAffittaAnnuncio'>"+jAnnunci[i].titolo+"</h5>"+
                            "</div>"+
                            "<div class='annuncioParteDue'>"+
                            "    <span class='glyphicon glyphicon-pencil iconaOpzioneAnnuncio modificaAffittaAnnuncio' aria-hidden='true'></span>"+         
                            "     <a href='#deleteAnnuncio-mmenu'>        "+
                            "        <span class='glyphicon glyphicon-trash iconaOpzioneAnnuncio eliminaAffittaAnnuncio' aria-hidden='true'>"+
                            "        </span>"+
                            "     </a>   "+
                            "</div>"+
                            "</div>"
                );

            //console.log(JSON.parse(annunci).length)
            //console.log(JSON.parse(annunci));
            
            //setTimeout(function(){
            //            window.location.href="new_home.html";
            //},50);                          
        }
} 
