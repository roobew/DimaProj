/*var replaceWith = $('<input type="text" style="width:100%;" placeholder="Nome annuncio" />'),
    connectWith = $('input[name="hiddenField"]');
var divToAdd="<div class='annuncioDiv'><div class='annuncioDelDiv'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></div><div class='annuncioContentDiv'></div></div>"*/

var countDeleteClick=0;
var actualPill=1;

$(document).ready(function (){

   // $("#affittaContent_creaAnnuncio").hide();
        
    
    $("#btnNuovoAnnuncio").on("tap", function (){
        
        $("#affittaContent").fadeOut();
        $("#affittaContent_creaAnnuncio").fadeIn();
        
        
    });
   
    $("#btnDeleteAnnuncio").on("tap", function (){
        
        $(".annuncioContentDiv").css("display","inline-block");
        if(countDeleteClick%2==0){    
            $(this).html("Fine");
            openDeleteElement();
        }
        else{
            $(this).html("Elimina"); 
            closeDeleteElement();
        }
        countDeleteClick++;
    });
    
    $("#annullaButton").on("tap", function (){
       /* var res=confirm("Annullando l'annuncio verrà eliminato. Sei sicuro di voler procedere?");   
        if(res==true){
            rimuoviAnnuncio(null,false);

            $("#affittaContent_creaAnnuncio").fadeOut();
            $("#affittaContent").fadeIn();
        }*/
        
        $("#affittaContent_creaAnnuncio").fadeOut();
       // $("#affittaContent").fadeIn();
    });
    
    $("#avantiUno").on("tap", function (){
        
        change_tabs(2);
         
    });
     
    $("#avantiDue").on("tap", function (){
        
        change_tabs(3);
         
    });
    
    $("#indietroDue").on("tap", function(){
        change_tabs(1);
          
    });
    
    $("#indietroTre").on("tap", function(){
       
        change_tabs(2);
          
    });
    
    $("#pillUno").on("tap", function(){
        /*if(actualPill==2){ 
            animate_due_uno();
        }
        else if(actualPill==3){
            animate_tre_uno();   
        }
        
        actualPill=1;*/
        change_tabs(1);
        
    });
    
    $("#pillDue").on("tap", function(){
        /*if(actualPill==1){ 
            animate_uno_due();
        }
        else if(actualPill==3){
            animate_tre_due();   
        }
        
        actualPill=2;*/
        change_tabs(2);
        
    });
    
   
    $("#pillTre").on("tap", function(){
        /*
        if(actualPill==1){ 
            animate_uno_tre();
        }
        else if(actualPill==2){
            animate_due_tre();   
        }
        
        actualPill=3;*/
        
        change_tabs(3);
    });
});

/*
jQuery(document).on('click','.annuncioDelDiv', function(event) { 
       // alert("cliccato "+ $(this).siblings().text());
        console.log("DELETE CLICCATO");
        var res=confirm("Eliminare l'annuncio '"+$(this).siblings().text()+"' ? ");   
        
        if(res==true){
            rimuoviAnnuncio($(this).parent(), true);      
        }
    });
*/


//Riceve in ingresso il div ".annuncioDiv" e un bool per l'animazione
function rimuoviAnnuncio(elementToRemove, animation){
    if(animation==true){   
        /*elementToRemove.animate({
            width: '0'   
        }, 800); 

        elementToRemove.animate({
            width: '0'   
        }, 800, function(){
            elementToRemove.remove();    
        });  */
        
        elementToRemove.fadeOut('fast', 'easeOutCubic', function(){
            elementToRemove.remove();   
        });
    }
}

function openDeleteElement(){
    
    $(".annuncioContentDiv").animate({
        left: '40px',
        width: '95%'   
    }, 300);
    
    
    
    $(".annuncioDelDiv").animate({
        width: '40px'
    }, 300);
    $(".annuncioDelDiv").fadeIn(800).css("display","inline-block"); 
}

function closeDeleteElement(){
    $(".annuncioContentDiv").animate({
        left: '0px',
        width: '100%'   
    }, 400);
    
    
    
    $(".annuncioDelDiv").animate({
        width: '0px'
    }, 400, function(){
        $(".annuncioDelDiv").fadeOut(800).css("display","none");   
    });
     
}

function change_tabs(dest){
    if(dest==1){
        $("#pillDue").removeClass("active");
        $("#pillTre").removeClass("active");
        $("#pillUno").addClass("active");
        
        $("#annuncioParteDue").hide();
        $("#annuncioParteTre").hide();
        $("#annuncioParteUno").show();
    }
    else if(dest==2){
        $("#pillUno").removeClass("active");
        $("#pillTre").removeClass("active");
        $("#pillDue").addClass("active");

        $("#annuncioParteUno").hide();
        $("#annuncioParteTre").hide();
        $("#annuncioParteDue").show();       
    }
    else if(dest==3){
        $("#pillUno").removeClass("active");
        $("#pillDue").removeClass("active");
        $("#pillTre").addClass("active");
        
        $("#annuncioParteUno").hide();
        $("#annuncioParteDue").hide();
        $("#annuncioParteTre").show();
    }
    
}

/*
function animate_uno_due(){
    $("#pillUno").removeClass("active");
    $("#pillDue").addClass("active");
    
    $("#annuncioParteUno").animate({
            left: '-100px', 
            width: '0px',
            opacity:0
        }, 500, function(){
            $(this).css("display", "none");   
        });  
        
        
        $("#annuncioParteDue").animate({
            right: '5vw', 
            width: '90vw',
            opacity:1
        }, 500);  
        
        $("#annuncioParteDue").fadeIn(1500).css("display","inline-block"); 
}

function animate_due_uno(){
    $("#pillDue").removeClass("active");
    $("#pillUno").addClass("active");
    
     $("#annuncioParteDue").animate({
            right: '0', 
            width: '0',
            opacity: 0
        }, 500, function(){
            $(this).css("display", "none"); 
        }); 
        
        $("#annuncioParteUno").animate({
            left: '10px', 
            width: '90vw',
            opacity:1
        }, 500);  
        
        $("#annuncioParteUno").fadeIn(1500).css("display","inline-block"); 
}

function animate_due_tre(){
    
    $("#pillDue").removeClass("active");
    $("#pillTre").addClass("active");
    
    $("#annuncioParteDue").animate({
            left: '-100px', 
            width: '0px',
            opacity:0
        }, 500, function(){
            $(this).css("display", "none");   
        });  
        
        
        $("#annuncioParteTre").animate({
            right: '5vw', 
            width: '90vw',
            opacity:1
        }, 500);  
        
        $("#annuncioParteTre").fadeIn(1500).css("display","inline-block"); 
    
}

function animate_tre_due(){
    
    $("#pillTre").removeClass("active");
    $("#pillDue").addClass("active");
    
    $("#annuncioParteTre").animate({
            right: '0', 
            width: '0',
            opacity: 0
        }, 500, function(){
            $(this).css("display", "none"); 
        }); 
        
        $("#annuncioParteDue").animate({
            left: '10px', 
            width: '90vw',
            opacity:1
        }, 500);  
        
        $("#annuncioParteDue").fadeIn(1500).css("display","inline-block");  
    
}*/

/*
function editText(nuovoAnnuncioDiv) {
    var elem = nuovoAnnuncioDiv.find(".annuncioContentDiv");

    console.log(elem);
    elem.hide();
    elem.after(replaceWith);
    replaceWith.focus();

    replaceWith.blur(function() {

        if ($(this).val() != "") {
            connectWith.val($(this).val()).change();
            elem.text($(this).val());
            $(this).val("");
        }
        else{
           elem.text("Nuovo annuncio");   
        }
        titoloNuovoAnnuncio=elem.text();
        console.log("l'annuncio è: "+titoloNuovoAnnuncio);
        $(this).remove();
        elem.show();

        creaAnnuncio();

    });

}
*/



