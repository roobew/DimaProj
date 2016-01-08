function drawMap(address){
  var myGeocoder = new google.maps.Geocoder();
  var myLatlng;
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('myMap'), mapOptions);

    //**** Geocode allows to translate an address into coordinates
  myGeocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);

        // Create a marker in the position founded by geocode function
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });

        // Create an infoview when mouse is over and close it when it's out
        var contentString = "<p><b> BIG GYM FITNESS CENTER</b> <p>";
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map,marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}