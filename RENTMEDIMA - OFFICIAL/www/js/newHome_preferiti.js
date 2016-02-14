
var actualDraggedDiv;

var elementDragged = false;

var sortActive=false;
var firstSorting=true;

var imgURL1="http://www.ansa.it/webimages/img_457x/2014/2/14/1392379654131_donald.jpg";
var imgURL2="http://www.cartoni-animati.com/wp-content/uploads/topolino_4.jpg";
   
var markersArray=[];
var tempCount=0;

$(document).ready(function (){
    
    setImageURL();
    
    $("#accordionPreferiti").accordion({
        active: false,
        heightStyle: "content",
        collapsible: true});
        
    $(".previewImage").on("tap", function(){
        var indiceImage=$(this).index();   
        console.log("INDICE: "+indiceImage);
        $.fn.createPhotoSwiperGallery(indiceImage);
        //$.fn.createPhotoSwiperGallery();
    });
    
    $(".rimuoviPreferito").on("tap", function(){
       $(this).closest(".accordionContent").prev("h2").remove(); 
       $(this).closest(".accordionContent").remove(); 
        
        removeMarker(tempCount);
        tempCount++;
    });
});





function setImageURL(){
    $(".previewImage:nth-child(1)").attr("src", imgURL1);
    $(".previewImage:nth-child(2)").attr("src", imgURL2);
    $(".previewImage:nth-child(3)").attr("src", imgURL1);
    $(".previewImage:nth-child(4)").attr("src", imgURL2);
    $(".previewImage:nth-child(5)").attr("src", imgURL1);
    $(".previewImage:nth-child(6)").attr("src", imgURL2);
}

function provaClick(){
    console.log("oh it works");  
}

(function( $ ){
   $.fn.createPhotoSwiperGallery = function(myIndex) {
       
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: imgURL1,
            w: 1200,
            h: 900
        },
        {
            src: imgURL2,
            w: 1200,
            h: 900
        },
        {
            src: imgURL1,
            w: 1200,
            h: 900
        },
        {
            src: imgURL2,
            w: 1200,
            h: 900
        },
        {
            src: imgURL1,
            w: 1200,
            h: 900
        },
        {
            src: imgURL2,
            w: 1200,
            h: 900
        }
    ];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: myIndex // start at the passed index
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    
   }; 
})( jQuery );

// Funzione chiamata da new:home.js
function drawMyMarker(map){
    var lat1= 45.4602500;
    var long1= 9.1999700;

    var lat2=45.46356;
    var long2=9.19419;
    
    
    var latLng1 = {lat: lat1, lng: long1};
    var latLng2 = {lat: lat2, lng: long2};

  

  var marker1 = new google.maps.Marker({
    position: latLng1,
    map: map,
    label: "A",
    title: 'Preferito 1'
  });
    markersArray.push(marker1);
    
    var marker2 = new google.maps.Marker({
    position: latLng2,
    map: map,
    label: "B",
    title: 'Preferito 2'
  });
    markersArray.push(marker2);
    
    
    marker1.addListener('click', function() {
       $(".accordionTitle").css("color", "red");
    });
    
    marker2.addListener('click', function() {
       $(".accordionTitle").css("color", "black");
    });
}

function removeMarker(index){
    markersArray[index].setMap(null);
}

