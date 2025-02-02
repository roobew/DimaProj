var mappaRisultatiDisegnata=false;


var GoogleMap = (function(){
    var mapOptions,
        map,
        accuracy = new google.maps.Marker(),
        point = new google.maps.Marker();
    
    function initialize (){
        console.log("maps");
        navigator.geolocation.getCurrentPosition(start, error,{enableHighAccuracy: true});
    }
 
    //DA RIVEDERE
    function addMarkersToMap(Lat,Lng){
        console.log("addmarkers");
        var latitudeAndLongitude = new google.maps.LatLng(Lat,Lng);
        console.log(latitudeAndLongitude.lat());
        var marker = new google.maps.Marker({
                            position: latitudeAndLongitude,
                            map: map
                        });
    }

    function start(position){
        console.log("Creating Map");
        mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            //mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT,
            },	
            disableDoubleClickZoom: true,
            maxZoom: 19,
            scaleControl: false,
            scrollwheel: false,
            rotateControl:false,
            streetViewControl: false,
            tilt:0,
            zoomControl: false,
            
            
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        var currentPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        accuracy.setOptions({
                    position: currentPosition,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: (position.coords.accuracy*2.5)*(map.getZoom()-16)+((map.getZoom()-16)*5),
                        fillColor: 'lightblue',
                        fillOpacity: 0.15,
                        strokeColor: 'lightblue',
                        strokeWeight: 1
                    },
                });
        point.setOptions({
                position: currentPosition,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7,//*16/map.getZoom(),
                    fillColor: 'lightblue',
                    fillOpacity: 1,
                    strokeColor: 'white',
                    strokeWeight: 3,//*16/map.getZoom()
                },
            });
        accuracy.visible=false;
        /*{console.log(
                map.getZoom() + '\n' +
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +          
                'Accuracy: '          + position.coords.accuracy          + '\n' +         
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n'
            );}*/
        console.log("Map Created");
        //aggiorno la posizione ogni secondo
        setInterval(function(){
            navigator.geolocation.getCurrentPosition(update, error,{enableHighAccuracy: true});   
        },1000);
        //aggiungo un marker alla mappa, poi dovrò aggiungerli tutti.
        addMarkersToMap('45.580589', '9.228000');
    }
    
    function update(position){
        console.log("Updating Location")
        var currentPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        oldPosition=point.getPosition();
        //se ho cambiato posizione la aggiorno sulla mappa
        if(!currentPosition.equals(oldPosition)){
            accuracy.setPosition(currentPosition);
            point.setPosition(currentPosition);
            {console.log(
                    map.getZoom() + '\n' +
                    'Latitude: '          + position.coords.latitude          + '\n' +
                    'Longitude: '         + position.coords.longitude         + '\n' +          
                    'Accuracy: '          + position.coords.accuracy          + '\n' +         
                    'Speed: '             + position.coords.speed             + '\n' +
                    'Timestamp: '         + position.timestamp                + '\n'
                );}
        }
        //se lo zoom è minore di 17 non faccio vedere l'accuratezza sulla mappa
        //DA RIVEDERE
        if(map.getZoom()<17){
            accuracy.visible=false;
        }
        else{   
                /*
                console.log('mostra');
                console.log(map.getZoom());
                console.log(position.coords.accuracy);
                console.log(accuracy.getIcon().scale);
                */
                //visualizzo l'accuratezza e ridimensiono il cerchio a seconda dei valori
                accuracy.visible=true;
                var ico = accuracy.getIcon();
                ico.scale = (position.coords.accuracy*2.5)*(map.getZoom()-16)+((map.getZoom()-16)*5);
                accuracy.setIcon(ico);                
            }
    }
    
    function error(error){
        console.log(error);
    }
    return {
        initialize: initialize,
        addMarkersToMap: addMarkersToMap
    }
});



$(document).ready(doStuff);

function doStuff(){
    //drawCercaMap();    
    console.log("dostuff");
    
    $("#doveButton").click(function(){
        $("#cercaContent").toggle();
        $("#cercaDove").toggle();
        $("#homeTopRow").toggle();
        $("#searchTopRow").toggle();
        
        $("#cercaVia").val("");
        //document.getElementById("selectZone").selectedIndex = 0;
        //$("#selectZone").text("Select a Zone");  
        nascondiBottomBar();
    });
    
    $("#backSearchBtn").click(function(){
        $("#cercaContent").toggle();
        $("#cercaDove").toggle();
        $("#homeTopRow").toggle();
        $("#searchTopRow").toggle();
        mostraBottomBar();
    });
    
    $("#backSearchResultBtn").click(function(){
        
        $("#cercaContent").toggle();
        $("#risultatiRicercaContent").toggle();
        $("#homeTopRow").toggle();
        $("#risultatiRicercaTopRow").toggle();
        mostraBottomBar();
    });
    
    $("#mappaRisultatiButton").click(function (){
        
        if(mappaRisultatiDisegnata==false){
            disegnaMappaRisultati();
            mappaRisultatiDisegnata=true;   
        }
        
        $("#listaRisultatiColumn").toggle();
        $("#mappaRisultatiColumn").toggle();
        
        $("#risultatiRicercaContent").fadeOut();
        $("#risultatiRicercaMap").fadeIn();
    });
    
    $("#listaRisultatiButton").click(function (){
        
        $("#listaRisultatiColumn").toggle();
        $("#mappaRisultatiColumn").toggle();
        
        $("#risultatiRicercaMap").fadeOut();
        $("#risultatiRicercaContent").fadeIn();
           
    });
    
    $('#selectZone').on('change',function(){
        $(".validateDontSubmit").submit();
    });
    
    $("#searchBtn").click(function(){
        
        
        inviaValoriRicerca();
        /*
        $("#risultatiRicercaMap").hide();
        $("#cercaContent").hide();
        
        $("#mappaRisultatiColumn").hide();
        $("#listaRisultatiColumn").show();
        
        $("#risultatiRicercaContent").show();
        
        
        $("#homeTopRow").toggle();
        $("#risultatiRicercaTopRow").toggle();
        nascondiBottomBar();
        */
    });
    
}

$(document).on('submit','.validateDontSubmit',function (e) {
    //prevent the form from doing a submit
    e.preventDefault();
    
    $("#cercaContent").toggle();
    $("#cercaDove").toggle();
    $("#homeTopRow").toggle();
    $("#searchTopRow").toggle();
    //gestione scritte da fare
   
   
    sceltaVia=$("#cercaVia").val();
    sceltaZonaIndex=$("#selectZone").val();
    sceltaZonaText=$("#selectZone :selected").text();
    //alert(sceltaZonaIndex);
    if(sceltaVia=="")
        if(sceltaZonaIndex=="-1" )
            $("#scelta").text("Posizione Attuale");
        else
            $("#scelta").text(sceltaZonaText);        
    else
        $("#scelta").text(sceltaVia);   
     mostraBottomBar();
    return false;
});

function inviaValoriRicerca(){
    var miaScelta=$("#scelta").text();
    var mioTipo=$("#tipoSelect").val();
    var mioPrezzoMin=$("#prezzoMin").val();
    var mioPrezzoMax=$("#prezzoMax").val();
    
    console.log("Scelta: "+miaScelta+" Tipo: "+mioTipo+" Min: "+mioPrezzoMin+" Max: "+mioPrezzoMax);
    
    
    var xhttp;
    
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log("Risposta: "+xhttp.responseText);
                
                var risultatiRicerca=JSON.parse(xhttp.response)
                console.log("Risultati ricerca: "+risultatiRicerca);
                riempiRisultatiRicerca();
            }
        };
    
        xhttp.open("POST", "http://rentme.altervista.org/serverFile/ricerca.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
        xhttp.send("mia_scelta="+miaScelta+"&mio_tipo="+mioTipo+"&mio_minPrezzo="+mioPrezzoMin+"&mio_maxPrezzo="+mioPrezzoMax);   
        
}

function disegnaMappaRisultati(){
    console.log("Disegno mappa risultati ricerca");
    var myLatlng;
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(45.4642200,9.1905600)
    }
    var map = new google.maps.Map(document.getElementById('risultatiRicercaMap'), mapOptions);

    drawMyMarker(map);
    
    google.maps.event.addListenerOnce(map, 'idle', function() {
        console.log("Resize event");
        google.maps.event.trigger(map, 'resize');
    });
    
    
    

} 

