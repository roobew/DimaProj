
var actualDraggedDiv;

$(document).ready(function (){
    
    /*$("*:not(.del)").click(function (){
        $(".wrapper").css({
            transform: "translateX(0)"
        });
    });*/
    
    $(".del").click(function() {
        console.log("cancello");
        var elementToDelete=$(this).closest("li").attr("id");
        $("#"+elementToDelete).fadeOut("slow",function(){
            $("#"+elementToDelete).remove();   
        });
    });
   
});

var elementDragged = false;

var elementDraggedCounter=0;

$(document).ready(function (){
    //init(); 
    
    $(".secondDiv").click(function (){
        console.log("Delete premuto");
        var parent=$(this).parent();

        $(parent).fadeOut("fast", function (){
            console.log("remove");
            $(parent).remove();    


$.fn.extend({
    createBtn: function () {
        //console.log("A1");
        var elmWidth = $("li", $(this)).width(),
            listType = $(this).listview("option", "inset") ? true : false,
            btnWidth = elmWidth < 300 && listType ? "35%" : elmWidth > 300 && !listType ? "25%" : "20%";
        $("li", $(this)).each(function () {
            var text = $(this).html();
            $(this).html($("<div/>", {
                class: "wrapper"
            }).append($("<div/>", {
                class: "go"
            }).text("Save").width(btnWidth)).append($("<div/>", {
                class: "item"
            }).text(text)).append($("<div/>", {
                class: "del"
            }).text("Delete").width(btnWidth)).css({
                left: "-" + btnWidth
            }).on("swipeleft swiperight vclick tap", function (e) {

                $(this).revealBtn(e, btnWidth);
            })  
                        );

       
        });
});

    $("#preferitiContent").click(function(event) {
        if(elementDragged==true){
            if(event.target.className != "secondDiv"){
                closeDraggableElement();
            }
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
    
    
        
});

function closeDraggableElement(){
    console.log("close draggable element function");
    $(actualDraggedDiv).stop().animate({
                             left: '0'
                    },1000,'easeOutCubic');

                    elementDragged=false; 
}

$(function() {
    console.log("Let's start!");
    
    var delta = 0;
    var minX=-200;
    var maxX=0;
    var yPosition=0;

    open: function (e, x, dir) {
        //console.log("opening");
        var posX = dir == "left" ? x : "-" + x;
        $(this).css({
            transform: "translateX(" + posX + ")"
        });
        //console.log("end opening");
    },
    
    
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
                    elementDraggedCounter++;
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
                    elementDraggedCounter--;
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



/*function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}*/
=======
>>>>>>> origin/master
