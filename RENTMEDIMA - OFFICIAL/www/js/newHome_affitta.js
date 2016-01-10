
$(document).ready(function (){
    $("#nuovoAnnuncioDiv").hide();
    
    $("#btnNuovoAnnuncio").button();
    
    $("#btnNuovoAnnuncio").click(function (){
        $(this).after("<br><div class='annuncioDiv'> Nome annuncio </div>");   
    });
});