
$(document).ready(startModificaDati);

function startModificaDati(){
    var newValue;
    var inputElement;
    var elementToOverride;
    
    $(".modificaIconText").on("tap", function(){
        
        inputElement= $(this).siblings(".userDataInputText");
        
        $(this).siblings(".userDataText").hide();
        inputElement.show();
        
        inputElement.focus();
                
    });
    
    $(".userDataInputText").blur(function() {
        newValue=$(this).val();
        console.log(newValue);
        
        elementToOverride= $(this).siblings(".userDataText");
        
        if(elementToOverride.attr("id") == "pwInputField"){
            console.log("hiiiii");
            // show confirm password input text
            $(this).parent().next().find("#confermaPwUtenteInput")
        }
        else{
            elementToOverride.text(newValue);       
        }
        
        
        $(this).hide();
        $(this).siblings(".userDataText").show();
        /*
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

        */

    });
    
    
}