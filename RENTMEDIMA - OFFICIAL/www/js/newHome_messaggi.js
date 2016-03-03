
var actualDraggedDiv;

var elementDragged = false;

var sortActive=false;
var firstSorting=true;

var messaggioID_toDelete;

var testoMessaggio, timeInvioMessaggio;

var messaggioHTMLcontent;

var myDivToScrollBottom;

var currentDate = new Date();
//var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

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
        
        $("#"+messaggioID_toDelete).addClass("remove");
            
        setTimeout(function(){ 
            $("#"+messaggioID_toDelete).prev().remove();
            $("#"+messaggioID_toDelete).remove();   
            
        }, 150);
        
         
    });
    
    
    $("#deleteMessageMenuAnnullaButton").on("tap", function (){
        console.log("Premuto ANNULLA");
        closeDraggableElement();
    });
    
    $(".messageSecondDiv").on("tap", function (){
        
        console.log("Apro menu messaggi");
        messaggioID_toDelete=$(this).parent().attr("id");
        console.log("id da cancellare è: "+messaggioID_toDelete);
        
    });
    
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
    
    $("#myFilter").focusin(function (){
        if(elementDragged==true){
            console.log("CHIUDO");
            closeDraggableElement(); 
        }   
    });
    
    $(".messageFirstDiv").click(function(){
         
        if(elementDragged==true){
            console.log("CHIUDO");
            closeDraggableElement(); 
            return;
        }
        
        console.log("GO TO message Detail"); 

        myDivToScrollBottom = document.getElementById("messageFlowDiv");

        scrollToBottom();

        nascondiBottomBar();

        $("#homeTopRow").hide();
        $("#messaggiHomeTopRow").show();

        $("#messaggiContent").hide();
        $("#messaggiDetailContent").show(); 
            
        
    });

    
    $("#backToMessageList").click(function(){
        mostraBottomBar();
        
        updatePreviewElement();
        
        $(".previewText").text(testoMessaggio);
        $(".time").text(timeInvioMessaggio);
        
        $("#messaggiHomeTopRow").hide();
        $("#homeTopRow").show();
        
        $("#messaggiDetailContent").hide();
        $("#messaggiContent").show();
        
    });
    
    $("#inviaMessaggioButton").on("tap", function(){
        inviaMessaggio(); 
        
        scrollToBottom();
        
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

function inviaMessaggio(){
     testoMessaggio=$("#messageInputText").val();
     timeInvioMessaggio=currentDate.getHours()+":"+currentDate.getMinutes();
    
     console.log("INVIO: "+testoMessaggio);
     console.log("Alle ore: "+timeInvioMessaggio);
    
     messaggioHTMLcontent="<div class='bubbleDivContainer'><div class='bubbleRight rightMessage'><h6>"+testoMessaggio+"</h6></div></div>";
    
     $("#messageFlowDiv").append(messaggioHTMLcontent);
     $("#messageInputText").val("");
}

function scrollToBottom(){
    
    myDivToScrollBottom.scrollTop = myDivToScrollBottom.scrollHeight;
   
}


function updatePreviewElement(){
    
    var adesso=new Date().getTime();
    //var diff = new Date().getTime() - currentDate.getTime();
    var last=currentDate.getTime();
    
    console.log("Adesso :"+adesso);
    console.log("LAST :"+last);
     var diff=adesso-last;
    
    console.log("DIFF è: "+diff);
    
    var days = diff / 1000 / 60 / 60 / 24;
    console.log("giorni_ "+days);
    
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




