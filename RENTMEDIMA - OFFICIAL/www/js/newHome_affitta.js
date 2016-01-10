
$(document).ready(function (){
    $("#nuovoAnnuncioDiv").hide();
    
    $("#btnNuovoAnnuncio").button();
    
    $("#btnNuovoAnnuncio").click(function (){
        $(this).after("<div class='annuncioDiv'> Nome annuncio </div>");   
    });
});