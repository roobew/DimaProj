
var actualDraggedDiv;

var elementDragged = false;

var sortActive=false;
var firstSorting=true;

var imgURL1="http://www.ansa.it/webimages/img_457x/2014/2/14/1392379654131_donald.jpg";
var imgURL2="http://www.cartoni-animati.com/wp-content/uploads/topolino_4.jpg";
   
var markersArray=[];
var tempCount=0, aggiuntoPreferitiCount=false;;

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
    
    $(".eliminaPreferitoIcon").click(function(){
       $(this).closest(".accordionContent").prev("h2").remove(); 
       $(this).closest(".accordionContent").remove(); 
        
        removeMarker(tempCount);
        tempCount++;
    });
    
    $("#aggiungiPreferitiButton").on("tap", function(){
        if(aggiuntoPreferitiCount==true){
             $(this).css("color", "white");
             aggiuntoPreferitiCount=false;
             rimuoviPreferito();
            
         }
        else{
            //$(this).addClass("aggiuntoPreferiti");  
            aggiuntoPreferitiCount=true;
            
            $(this).animate({
                    color:"#b5322b"   
                }, 200, function(){
                aggiungiPreferito();   
            });
        }
              
    });
    
    $("#apriMessaggioButton_daHome").on("tap", function(){
        // TRUE= DA HOME
        apriPaginaMessaggio(true); 
    });
    
    $("#apriMessaggioButton_daPreferiti").on("tap", function(){
        // FALSE = DA PREFERITI
        apriPaginaMessaggio(false); 
    });
    
    $("#backToPaginaDettaglioAnnuncio_PerHome").click(function(){
        // TRUE = VERS HOME
        tornaAlDettaglioAnnuncio(true);         
    }); 
    
    $("#backToPaginaDettaglioAnnuncio_PerPreferiti").click(function(){
        // FALSE = VERSO PREFERITI
        tornaAlDettaglioAnnuncio(false);         
    });
    
    
    
    $("#backLink_fromPreferiti").click(function (){
       
        mostraBottomBar();
        
        $("#dettaglioAnnuncioTopRow_daPreferiti").hide();
        $("#homeTopRow").show();
        

        $("#pageDettaglioContent").hide();
        $("#preferitiContent").show();
        
        
    });
});


function tornaAlDettaglioAnnuncio(tornaHome){
    if(tornaHome==true){
        $("#messaggiHomeTopRow_daDettaglioAnnuncio").hide();
        $("#dettaglioAnnuncioTopRow").show();
    }
    else{
        $("#messaggiHomeTopRow_daDettaglioAnnuncio_daPreferiti").hide();
        $("#dettaglioAnnuncioTopRow_daPreferiti").show();
    }    
    
    $("#messaggiDetailContent").hide();
    $("#pageDettaglioContent").show(); 
}

function apriPaginaMessaggio(daHome){
    console.log("APRO PAgina messaggi");   
    
    nascondiBottomBar();
    if(daHome==true){
        $("#dettaglioAnnuncioTopRow").hide();

        $("#messaggiHomeTopRow_daDettaglioAnnuncio").show();

        $("#pageDettaglioContent").hide();
        $("#messaggiDetailContent").show();
    }
    else{
        $("#dettaglioAnnuncioTopRow_daPreferiti").hide();

        $("#messaggiHomeTopRow_daDettaglioAnnuncio_daPreferiti").show();

        $("#pageDettaglioContent").hide();
        $("#messaggiDetailContent").show();  
    }
    
}

function rimuoviPreferito(){
    // In base all'id dell'annuncio, rimuove il preferito   
}

function aggiungiPreferito(){

    var cloneTitolo=$(".accordionTitle:first").clone(true); //.appendTo("#bozzeDiv");
    var cloneContent=$(".accordionContent:first").clone(true); //.appendTo("#bozzeDiv");
    
    //console.log("ID prima: "+cloneTitolo.attr("id"));
    //clonedElement.removeAttr("id");
    //console.log("ID dopo: "+cloneTitolo.attr("id"));
    
    cloneTitolo.appendTo("#accordionPreferiti");
    cloneContent.appendTo("#accordionPreferiti");
    
}

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


function vediDettaglioAnnuncio(){
    
    console.log("Mostra Dettaglio");
    
    nascondiBottomBar();
    
    if(dettaglioMapInit==false){

        drawMapDettaglio();
        dettaglioMapInit=true;
    }
    
    $("#homeTopRow").hide();
    $("#dettaglioAnnuncioTopRow_daPreferiti").show();
    
    $("#preferitiContent").hide();
    $("#pageDettaglioContent").show();
    
}
