var GoogleMap = ( function(){
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