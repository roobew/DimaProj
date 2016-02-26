
var actualDraggedDiv;

var elementDragged = false;

var sortActive=false;
var firstSorting=true;


$(document).ready(function (){
    console.log("Nel JS di MESSAGGI");
    /*
    $(".messageSecondDiv").on("tap", function (){
       console.log("Delete premuto");
            
            var parent=$(this).parent();
       
            parent.animate({width:'0'}, 200, function(){
                parent.prev().remove();
                parent.remove(); 
            
            }); 
        

    });*/
    
   /*$("#messaggiContent").on("tap", function (event){
        console.log("Hai cliccato "+ event.target.className);
        
       if(elementDragged==true){
            if(event.target.className == "messageSecondDiv" || event.target.className=="glyphicon glyphicon-trash"){
                console.log("Delete premuto "+$(this));
                
                var miaClasse="."+event.target.className;
                console.log("MiaClasse è: "+miaClasse);
                var clickedElement= $(""+miaClasse); 
                console.log("AAA "+clickedElement);
                var parent= clickedElement.closest(".messageDivParent");

                parent.animate({width:'0'}, 200, function(){
                    parent.prev().remove();
                    parent.remove(); 

                }); 
            }
            else{
                console.log("chiudo tutto");
                closeDraggableElement();     
            }
       }
       else{
           
       }
    });
    */
    
    
    $("#deleteMessageMenuEliminaButton").on("tap", function (){
        console.log("Premuto ELIMINA");
    });
    
    
    $("#deleteMessageMenuAnnullaButton").on("tap", function (){
        console.log("Premuto ANNULLA");
        closeDraggableElement();
    });
    /*
    $(".messageSecondDiv").on("tap", function (){
        var parentElement= $(this).parent();
        
        parentElement.prev().remove();
        
        parentElement.remove();
        
        
    });
    */
    /*
    $(".messageFirstDiv").on("tap", function (){
        if(elementDragged==true){  
            closeDraggableElement();
        }
    });

    $("#fixedBottomDiv").on("tap", function (){
        if(elementDragged==true){
            closeDraggableElement();   
        }
    });

    // PROBLEMA: ELEMENTO DRAGGATO, APRO MENU, CHIUDO MENU E SCOMPARE LA BARRA IN BASSO
    $(".header").on("tap", function (){
       if(elementDragged==true){
            closeDraggableElement();   
        }
    });
    */
    
    $(".messageDivParent").on("tap", function(){
        console.log("GO TO message Detail"); 
        
        //$("#fixedBottomDiv").hide();
        //$("#messaggiContent").hide();
       // $("#messaggiDetailContent").show();
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


$(function() {
    console.log("Let's start!");
    
    var delta = 0;
    var minX=-200;
    var maxX=0;
    var yPosition=0;
    
    $(".messageFirstDiv").draggable({
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
                             left: '-20vw'
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
                             left: '-20vw'
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




