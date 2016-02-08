var replaceWith = $('<input type="text" style="width:100%;" placeholder="Nome annuncio" />'),
    connectWith = $('input[name="hiddenField"]');
var firstModify=true;

var divToAdd="<div class='annuncioDiv'><div class='annuncioDelDiv'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></div><div class='annuncioContentDiv'></div></div>"

var countDeleteClick=0;

var newAnnuncio;
var titoloNuovoAnnuncio;

$(document).ready(function (){

    $("#affittaContent_creaAnnuncio").hide();
        
    $("#btnNuovoAnnuncio").click(function (){
        $("#buttonsDiv").after(divToAdd);  
        newAnnuncio=$('.annuncioDiv').first();
        editText(newAnnuncio);
        //$('.annuncioDiv').first().inlineEdit(replaceWith, connectWith);
        //$('.annuncioDiv').first().focus();
    });
    
    $('#provaFocus').bind("keydown", function(e){
   // enter key code is 13
       console.log("Dentro");
   /*if(e.which == 13 || e.keyCode==13){
       alert("Enter");
     console.log("user pressed done");
    }*/ 
    });
    
    $("#provaFocus").focusout(function(){
        console.log("focused OUT!!");   
    });
   
    $("#btnDeleteAnnuncio").click(function (){
        
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
    
    $("#annullaButton").click(function (){
        var res=confirm("Annullando l'annuncio verrà eliminato. Sei sicuro di voler procedere?");   
        if(res==true){
            rimuoviAnnuncio(newAnnuncio,false);

            $("#affittaContent_creaAnnuncio").fadeOut();
            $("#affittaContent").fadeIn();
        }
    });
});

jQuery(document).on('click','.annuncioDelDiv', function(event) { 
       // alert("cliccato "+ $(this).siblings().text());
        var res=confirm("Eliminare l'annuncio '"+$(this).siblings().text()+"' ? ");   
        
        if(res==true){
            rimuoviAnnuncio($(this).parent(), true);      
        }
    });

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
    else{
        elementToRemove.remove();   
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

function editText(nuovoAnnuncioDiv) {
   /* $(this).hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });*/
    
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

function creaAnnuncio(){
    $("#affittaContent").fadeOut();
    $("#affittaContent_creaAnnuncio").fadeIn();
    
    $("#titoloAnnuncio").text(titoloNuovoAnnuncio);
    
    
}

/*
$.fn.inlineEdit = function(replaceWith, connectWith) {
    
    $(this).hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $(this).click(function() {
        
        var elem = $(this);
        //console.log(elem);
        
        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();
        //console.log(replaceWith);
        
        replaceWith.blur(function() {

            console.log("BLUR event");
            if ($(this).val() != "") {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
                replaceWith.val("");
            }

            $(this).remove();
            elem.show();
        });
    });
};
*/
