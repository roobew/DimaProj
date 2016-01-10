
var actualDraggedDiv;

var elementDragged = false;

var sortActive=false;
var firstSorting=true;

var imgURL1="http://www.ansa.it/webimages/img_457x/2014/2/14/1392379654131_donald.jpg";
var imgURL2="http://www.cartoni-animati.com/wp-content/uploads/topolino_4.jpg";

$(document).ready(function (){

    setImageURL();
    
    $("#accordion").accordion({
        active: false,
        heightStyle: "content",
        collapsible: true});
    
    $(".secondDiv").click(function (e){
        
        var parent=$(this).parent();
        var content=$(parent).next();
        
        var total= parent.add(content);
        console.log("Delete premuto");
        
        //$(parent).closest("div").css("background-color", "green");
        //$(parent).next().remove();
       /*total.animate({width:'0'}, 200, function(){
            
            total.remove(); 
            
        }); */
        
        parent.add(content).fadeOut('slow',function(){$(this).remove();});
    
        
    
    });
    
    $(".firstDiv").click(function(event){
        if(elementDragged==true){
            console.log("AAAABBBBCCCC");
            event.stopImmediatePropagation();  
            closeDraggableElement();
        }
    });

    $("#fixedBottomDiv").click(function (){
        if(elementDragged==true){
            closeDraggableElement();   
        }
    });

    // PROBLEMA: ELEMENTO DRAGGATO, APRO MENU, CHIUDO MENU E SCOMPARE LA BARRA IN BASSO
    $(".header").click(function (event){
       if(elementDragged==true){
            closeDraggableElement();   
        }
    });
    
    $("#ordinaButton").click(function(){
        $("#accordion").accordion("enable");
        console.log("CLICCATO BUTTON");
        if(sortActive==false){    
            $(this).text("Fine");
            $(".firstDiv").draggable("disable"); 
            console.log("DISABLE DRAG - ENABLE SORT");
            $("#accordion").sortable();
            $("#accordion").disableSelection();
                        
            sortActive=true;
            
            if(firstSorting==true){
                
                $("#accordion").sortable({
                    disabled: false,
                    revert: true,
                    axis: "y"});
                firstSorting=false;
            }
            else{
                $("#accordion").sortable("enable");   
            }
            
        }
        else{
            $(this).text("Ordina");
            $(".firstDiv").draggable("enable"); 
            console.log("ENABLE DRAG - DISABLE SORT");
            $("#preferitiContent").sortable("disable");
            sortActive=false;
        }
    });
    
    $(".previewImage").click(function (){
        var indiceImage=$(this).index();   
        console.log("INDICE: "+indiceImage);
        $.fn.createPhotoSwiperGallery(indiceImage);
        //$.fn.createPhotoSwiperGallery();
    });
});

function closeDraggableElement(){
    console.log("Chiudo il dragged element!");
    $(actualDraggedDiv).stop().animate({
                             left: '0'
                    },1000,'easeOutCubic');

    elementDragged=false; 
    //$("#accordion").accordion("enable");
}

function setImageURL(){
    $(".previewImage:nth-child(1)").attr("src", imgURL1);
    $(".previewImage:nth-child(2)").attr("src", imgURL2);
    $(".previewImage:nth-child(3)").attr("src", imgURL1);
    $(".previewImage:nth-child(4)").attr("src", imgURL2);
    $(".previewImage:nth-child(5)").attr("src", imgURL1);
    $(".previewImage:nth-child(6)").attr("src", imgURL2);
}

$(function() {
    console.log("Let's start!");
    
    var delta = 0;
    var minX=-200;
    var maxX=0;
    var yPosition=0;
    
    $(".firstDiv").draggable({
        // Can't use revert, as we animate the original object
        
        appendTo: 'body',
        axis: "x",  
        containment: [minX,yPosition,maxX,yPosition],
        helper: function(){
            // Create an invisible div as the helper. It will move and
            // follow the cursor as usual.
            return $('<div></div>').css('opacity',0);
        },
        create: function(){
            console.log("creo");
            // When the draggable is created, save its starting
            // position into a data attribute, so we know where we
            // need to revert to.
            //var $this = $(this);
            //$this.data('starttop',$this.position().top);
        },
        
        start: function(event, ui) {
            start = ui.position.left;
            console.log("Start Drag");
            
            if(elementDragged==true && actualDraggedDiv!=$(this).parent()){
                console.log("Già uno aperto! Devi chiudere quello, non draggare"); 
                closeDraggableElement();
                return false;
            }
            
        },
        stop: function(event, ui){
            // When dragging stops, revert the draggable to its
            // original starting position.
            
            actualDraggedDiv=$(this).parent();
            //console.log("ActualDraggedDiv= "+actualDraggedDiv);
            
            stop = ui.position.left;
            delta=start-stop;
            console.log(delta);
            
            if (elementDragged == false){  //elemento chiuso
                if(delta>70){
                    console.log("Trascinato a sufficienza in apertura");   

                    $(this).parent().stop().animate({
                             left: '-50%'
                    },1000,'easeOutExpo');

                    elementDragged=true;
                    //elementDraggedCounter++;
                }
                else if(delta>0 && delta<=70){
                    console.log("Trascinato poco in apertura");
                    $(this).parent().stop().animate({
                        left:0
                    },1000,'easeOutExpo');

                    elementDragged=false;
                }
            }
            else{  // elemento aperto
                if(delta<-1){
                    console.log("Trascinato a sufficienza in chiusura ")
                    
                    $(this).parent().stop().animate({
                        left:0
                    },1000,'easeOutExpo');

                    elementDragged=false;
                    //elementDraggedCounter--;
                }
                else{
                    console.log("Trascinato poco in chiusura ")
                    $(this).parent().stop().animate({
                             left: '-50%'
                    },1000,'easeOutExpo');

                    elementDragged=true;   
                }
            }
            //console.log("ELEMENT_DRAGGED= "+elementDragged);
        },
        drag: function(event, ui){
            console.log("Draggo");
            // During dragging, animate the original object to
            // follow the invisible helper with custom easing.
            $(this).parent().stop().animate({
                
                left: ui.helper.position().left
            },1000,'easeOutExpo');
            
           
        }
    });
   
});


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


