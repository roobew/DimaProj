/*var replaceWith = $('<input type="text" style="width:100%;" placeholder="Nome annuncio" />'),
    connectWith = $('input[name="hiddenField"]');*/
var divToAdd="<div class='annuncioDiv'><div class='annuncioDelDiv'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></div><div class='annuncioContentDiv'>annuncio </div></div>";

var countDeleteClick=0;
var actualPill=1;

$(document).ready(function (){
   
   /* $("#btnDeleteAnnuncio").on("tap", function (){
        
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
    });*/
  
    // **** EVENTU DI ANNUNCIO_HOME PAGE
    
    $("#pillUno").on("tap", function(){
        change_tabs(1);
    });
    
    $("#pillDue").on("tap", function(){
        change_tabs(2);
    });
    
    $("#pillTre").on("tap", function(){
        change_tabs(3);
    });
    
    $("#btnNuovoAnnuncio").on("tap", function (){
        console.log("CREO TUTTO");
        $("#affittaContent_creaAnnuncio").fadeIn();
        $("#affittaContent").fadeOut();   
  
    });
    
    $("#eliminaAnnuncioHome").on("tap", function(){
        alert("Elimina!"); 
    });    
      
    $(".annuncioDiv").on("tap", function(){
        
        $("#affittaContent").hide();
        setAnnuncioValue($(this));
        
        
        setTimeout(function(){ 
            $("#affittaContent_dettaglioAnnuncio").show();
        },30); 
         
    });
   
    
    
    // **** EVENTI DI NUOVO_ANNUNCIO PAGE
    $("#backMenuRowEliminaButton").on("tap", function (){
       
        
        //navigator.camera.cleanup(onSuccess, onFail);
        //console.log("ANNULLO TUTTO");
        $("#affittaContent_creaAnnuncio").fadeOut();
        $("#affittaContent").fadeIn();
    });
    
    $("#tipologiaInput").change(function (){
        
        var yourChoice=$("#tipologiaInput :radio:checked").val();  
    
        console.log("Your choice is: "+yourChoice);
        if(yourChoice=="Stanza Condivisa"){
            console.log("*** ABILITO");
            $("#postiLettoStanzaInput").prop("disabled",false);   
        }
        else{
            console.log("*** DISABILITO");
            $("#postiLettoStanzaInput").prop("disabled",true);
        }   
    });
     
    $(".nuovoAnnuncioBox").on("tap", function (){
        
        $("#annullaNuovoAnnuncioButton").hide();
        
        var boxID= $(this).attr("id");
        console.log("ID è: " + boxID );
        
        var myElementID;
        
        if(boxID=="titoloBox"){
            myElementID="Titolo";
          
        }
        else if(boxID=="prezzoBox"){
            myElementID="Prezzo";
           
        }
        else if(boxID=="fotoBox"){
            myElementID="Foto";
           
        }
        else if(boxID=="descrizioneBox"){
            myElementID="Descrizione";
             
        }
        else if(boxID=="numLocaliBox"){
            myElementID="NumLocali";
            
        }
        else if(boxID=="superficieBox"){
            myElementID="Superficie";
            
        }
        else if(boxID=="tipologiaBox"){
            myElementID="Tipologia";
            
        }
        else if(boxID=="postiLettoBox"){
            myElementID="PostiLetto";
            
        }
        else if(boxID=="pianoBox"){
            myElementID="Piano";
        }
        else if(boxID=="zonaBox"){
            myElementID="Zona";
        }
        else if(boxID=="indirizzoBox"){
            myElementID="Indirizzo";
        }
        else if(boxID=="metroBox"){
            myElementID="Metro";
        }
        else if(boxID=="tramBox"){
            myElementID="Tram";
        }
        else if(boxID=="busBox"){
            myElementID="Bus";
        }
        else if(boxID=="passanteBox"){
            myElementID="Passante";
        }
        else if(boxID=="altreFotoBox"){
            myElementID="AltreFoto";
        }
        
        $("#nuovoAnnuncioContent").hide();
        $("#nuovoAnnuncio"+myElementID+"Detail").show(); 
        
        
        /*$("#nuovoAnnuncio"+myElementID+"Detail").animate({
           scrollTop: 0
        }, 'slow'); 
        */
    });
    
    $(".backToAnnuncioContent").on("tap", function (){
        var boxDetailId=$(this).closest(".nuovoAnnuncioDetailContent").attr("id");
        var newValue;
        
        if(boxDetailId=="nuovoAnnuncioTitoloDetail"){
            
            newValue=$("#titoloInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#titoloPreview"), $("#titoloCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioPrezzoDetail"){
            
            newValue=$("#prezzoInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#prezzoPreview"), $("#prezzoCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioFotoDetail"){
            $(".nuovoAnnuncioDetailContent").hide();
            $("#fotoPreview").show();
            $("#fotoCheckedIcon").removeClass("glyphicon-unchecked");
            
            $("#fotoCheckedIcon").addClass("glyphicon-check");
                
            setTimeout(function(){ 
                $("#nuovoAnnuncioContent").show(); 
                $("#annullaNuovoAnnuncioButton").show(); 
            }, 70);
            
        }
        else if(boxDetailId=="nuovoAnnuncioDescrizioneDetail"){
            var newValue=$("#descrizioneInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#descrizionePreview"), $("#descrizioneCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioNumLocaliDetail"){
            var newValue=$("#numLocaliInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#numLocaliPreview"), $("#numLocaliCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioSuperficieDetail"){
            var newValue=$("#superficieInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#superficiePreview"), $("#superficieCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioTipologiaDetail"){
            var newValue=$("#tipologiaInput :radio:checked").val();  
            
            if(newValue=="Stanza Condivisa"){
                newValue=newValue + " - Posti Letto: "+$("#postiLettoStanzaInput").val();
            }
            
            backToNuovoAnnuncioFunction(newValue, $("#tipologiaPreview"), $("#tipologiaCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioPostiLettoDetail"){
            var newValue=$("#postiLettoInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#postiLettoPreview"), $("#postiLettoCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioPianoDetail"){
            var newValue=$("#pianoInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#pianoPreview"), $("#pianoCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioZonaDetail"){
            var newValue=$("#zonaInput :radio:checked").val(); 
            
            backToNuovoAnnuncioFunction(newValue, $("#zonaPreview"), $("#zonaCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioIndirizzoDetail"){
            var newValue=$("#indirizzoInput").val();  
            
            backToNuovoAnnuncioFunction(newValue, $("#indirizzoPreview"), $("#indirizzoCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioMetroDetail"){
           var newValue = $('input[name="elencoMetro"]:checked').map(function() {
                return this.value;
            }).get();
                        
            backToNuovoAnnuncioFunction(newValue, $("#metroPreview"), $("#metroCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioTramDetail"){
           var newValue = $('input[name="elencoTram"]:checked').map(function() {
                return this.value;
            }).get();
                        
            backToNuovoAnnuncioFunction(newValue, $("#tramPreview"), $("#tramCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioBusDetail"){
           var newValue = $('input[name="elencoBus"]:checked').map(function() {
                return this.value;
            }).get();
                        
            backToNuovoAnnuncioFunction(newValue, $("#busPreview"), $("#busCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioPassanteDetail"){
           var newValue = $('input[name="elencoPassante"]:checked').map(function() {
                return this.value;
            }).get();
                        
            backToNuovoAnnuncioFunction(newValue, $("#passantePreview"), $("#passanteCheckedIcon"));
            
        }
        else if(boxDetailId=="nuovoAnnuncioAltreFotoDetail"){
            $(".nuovoAnnuncioDetailContent").hide();
            $("#altreFotoPreview").show();
            $("#altreFotoCheckedIcon").removeClass("glyphicon-unchecked");
            
            $("#altreFotoCheckedIcon").addClass("glyphicon-check");
            
            setTimeout(function(){ 
                $("#nuovoAnnuncioContent").show(); 
                $("#annullaNuovoAnnuncioButton").show(); 
            }, 70);
            
        }
        
    });
       
    /*$("#pubblicaAnnuncioButton").on("tap", function(){
        //if(checkCorrectValue()==true){
            $("#affittaContent_creaAnnuncio").fadeOut();
            $("#affittaContent").fadeIn();  
        
            $("#affittaContent .annuncioDiv").first().before(divToAdd);
        //}
    });*/
    
    
    
    // **** EVENTI DI MODIFICA_ANNUNCIO PAGE
    $("#modificaAnnuncioMenuRowAnnullaModificaButton").on("tap", function(){
        setTimeout(function(){ 
            $("#affittaContent_dettaglioAnnuncio").hide();
            $("#affittaContent").show();
        },70);  
    });
    
    $("#modificaAnnuncioMenuRowConfermaButton").on("tap", function(){
        setTimeout(function(){ 
            $("#affittaContent_dettaglioAnnuncio").hide();
            $("#affittaContent").show();
        },70);  
    });
    
    $(".modificaAnnuncioBox").on("tap", function (){
        
        $("#backToAnnuncioHome").hide();
        
        var boxID= $(this).attr("id");
        console.log("ID è: " + boxID );
        
        var myElementID;
        
        if(boxID=="modifica_titoloBox"){
            myElementID="Titolo";
          
        }
        else if(boxID=="modifica_prezzoBox"){
            myElementID="Prezzo";
           
        }
        else if(boxID=="modifica_fotoBox"){
            myElementID="Foto";
           
        }
        else if(boxID=="modifica_descrizioneBox"){
            myElementID="Descrizione";
             
        }
        else if(boxID=="modifica_numLocaliBox"){
            myElementID="NumLocali";
            
        }
        else if(boxID=="modifica_superficieBox"){
            myElementID="Superficie";
            
        }
        else if(boxID=="modifica_tipologiaBox"){
            myElementID="Tipologia";
            
        }
        else if(boxID=="modifica_postiLettoBox"){
            myElementID="PostiLetto";
            
        }
        else if(boxID=="modifica_pianoBox"){
            myElementID="Piano";
        }
        else if(boxID=="modifica_zonaBox"){
            myElementID="Zona";
        }
        else if(boxID=="modifica_indirizzoBox"){
            myElementID="Indirizzo";
        }
        else if(boxID=="modifica_metroBox"){
            myElementID="Metro";
        }
        else if(boxID=="modifica_tramBox"){
            myElementID="Tram";
        }
        else if(boxID=="modifica_busBox"){
            myElementID="Bus";
        }
        else if(boxID=="modifica_passanteBox"){
            myElementID="Passante";
        }
        else if(boxID=="modifica_altreFotoBox"){
            myElementID="AltreFoto";
        }
        
        $("#modificaAnnuncioContent").hide();
        $("#modificaAnnuncio"+myElementID+"Detail").show();
         
        
        
    });
    
    $(".modifica_backToAnnuncioContent").on("tap", function (){
        var boxDetailId=$(this).closest(".modificaAnnuncioDetailContent").attr("id");
        var newValue;
        
        if(boxDetailId=="modificaAnnuncioTitoloDetail"){
            
            newValue=$("#modifica_titoloInput").val();  

            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_titoloPreview"), $("#modifica_titoloCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioPrezzoDetail"){
            
            newValue=$("#modifica_prezzoInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_prezzoPreview"), $("#modifica_prezzoCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioFotoDetail"){
            $(".modificaAnnuncioDetailContent").hide();
            $("#modifica_fotoPreview").show();
            $("#modifica_fotoCheckedIcon").removeClass("glyphicon-unchecked");
            
            $("#modifica_fotoCheckedIcon").addClass("glyphicon-check");
                
            setTimeout(function(){ 
                $("#modificaAnnuncioContent").show(); 
                $("#backToAnnuncioHome").show(); 
            }, 70);
            
        }
        else if(boxDetailId=="modificaAnnuncioDescrizioneDetail"){
            var newValue=$("#modifica_descrizioneInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_descrizionePreview"), $("#modifica_descrizioneCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioNumLocaliDetail"){
            var newValue=$("#modifica_numLocaliInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_numLocaliPreview"), $("#modifica_numLocaliCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioSuperficieDetail"){
            var newValue=$("#modifica_superficieInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_superficiePreview"), $("#modifica_superficieCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioTipologiaDetail"){
            var newValue=$("#modifica_tipologiaInput :radio:checked").val();  
            
            if(newValue=="Stanza Condivisa"){
                newValue=newValue + " - Posti Letto: "+$("#modifica_postiLettoStanzaInput").val();
            }
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_tipologiaPreview"), $("#modifica_tipologiaCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioPostiLettoDetail"){
            var newValue=$("#modifica_postiLettoInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_postiLettoPreview"), $("#modifica_postiLettoCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioPianoDetail"){
            var newValue=$("#modifica_pianoInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_pianoPreview"), $("#modifica_pianoCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioZonaDetail"){
            var newValue=$("#modifica_zonaInput :radio:checked").val(); 
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_zonaPreview"), $("#modifica_zonaCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioIndirizzoDetail"){
            var newValue=$("#modifica_indirizzoInput").val();  
            
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_indirizzoPreview"), $("#modifica_indirizzoCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioMetroDetail"){
           var newValue = $('input[name="modifica_elencoMetro"]:checked').map(function() {
                return this.value;
            }).get();
                        
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_metroPreview"), $("#modifica_metroCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioTramDetail"){
           var newValue = $('input[name="modifica_elencoTram"]:checked').map(function() {
                return this.value;
            }).get();
                        
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_tramPreview"), $("#modifica_tramCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioBusDetail"){
           var newValue = $('input[name="modifica_elencoBus"]:checked').map(function() {
                return this.value;
            }).get();
                        
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_busPreview"), $("#modifica_busCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioPassanteDetail"){
           var newValue = $('input[name="modifica_elencoPassante"]:checked').map(function() {
                return this.value;
            }).get();
                        
            modifica_backToNuovoAnnuncioFunction(newValue, $("#modifica_passantePreview"), $("#modifica_passanteCheckedIcon"));
            
        }
        else if(boxDetailId=="modificaAnnuncioAltreFotoDetail"){
            $(".modificaAnnuncioDetailContent").hide();
            $("#modifica_altreFotoPreview").show();
            $("#modifica_altreFotoCheckedIcon").removeClass("glyphicon-unchecked");
            
            $("#modifica_altreFotoCheckedIcon").addClass("glyphicon-check");
            
            setTimeout(function(){ 
                $("#modificaAnnuncioContent").show(); 
                $("#backToAnnuncioHome").show(); 
            }, 70);
            
        }
        
    });
    
});

function setAnnuncioValue(annuncioClicked){
    var titolo=annuncioClicked.find(".annuncioDivTitolo").text();
    var zona=annuncioClicked.find(".annuncioDivZona").text();
    var indirizzo=annuncioClicked.find(".annuncioDivIndirizzo").text();
    
    console.log("Titolo è: "+titolo);
    console.log("Zona è: "+zona);
    console.log("Indirizzo è: "+indirizzo);
    
    $("#modifica_titoloPreview").text(titolo);
    $("#modifica_titoloInput").val(titolo);
    
    $("#modifica_indirizzoPreview").text(indirizzo);
    $("#modifica_indirizzoInput").val(indirizzo);
    
    $("#modifica_zonaPreview").text(zona);
    //$("#modifica_zonaInput").text(zona);
}

function checkValue(){
    
}

function backToNuovoAnnuncioFunction(value, elementPreview, elementCheckedIcon){    
    
    if(value!=""){
        elementPreview.text(value);
        
        elementCheckedIcon.removeClass("glyphicon-unchecked");
        
        elementCheckedIcon.addClass("glyphicon-check");
    }
    else{
        elementPreview.text("-");

        elementCheckedIcon.removeClass("glyphicon-ok-sign");
        elementCheckedIcon.addClass("glyphicon-unchecked");
       
    }

    $(".nuovoAnnuncioDetailContent").fadeOut();
    
    $("#nuovoAnnuncioContent").fadeIn(200, "swing", function(){
        setTimeout(function(){ 
         
        $("#annullaNuovoAnnuncioButton").show(); 
    }, 70);   
    });
    
    
    
}


function modifica_backToNuovoAnnuncioFunction(value, elementPreview, elementCheckedIcon){
    
    if(value!=""){
        elementPreview.text(value);
        
        elementCheckedIcon.removeClass("glyphicon-unchecked");
        
        elementCheckedIcon.addClass("glyphicon-check");
    }
    else{
        elementPreview.text("-");

        elementCheckedIcon.removeClass("glyphicon-ok-sign");
        elementCheckedIcon.addClass("glyphicon-unchecked");
       
    }

    $(".modificaAnnuncioDetailContent").hide();   
    
    setTimeout(function(){ 
        $("#modificaAnnuncioContent").show(); 
        $("#backToAnnuncioHome").show(); 
    }, 70);
}
    

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
        $("#pillDue").removeClass("myActiveClass");
        $("#pillDue").children().removeClass("myActiveClassColor");
        $("#pillDue").children().addClass("myActiveClassColorStandard");
        
        $("#pillTre").removeClass("myActiveClass");
        $("#pillTre").children().removeClass("myActiveClassColor");
        $("#pillTre").children().addClass("myActiveClassColorStandard");
        
        $("#pillUno").addClass("myActiveClass");
        $("#pillUno").children().addClass("myActiveClassColor");
        $("#pillUno").children().removeClass("myActiveClassColorStandard");
        
        $("#bozzeDiv").hide();
        $("#scadutiDiv").hide();
        $("#pubblicatiDiv").show();
        
     
        
        $("#bozzeDiv").hide();
        $("#scadutiDiv").hide();
        $("#pubblicatiDiv").show();
    }
    else if(dest==2){
        $("#pillUno").removeClass("myActiveClass");
        $("#pillUno").children().removeClass("myActiveClassColor");
        $("#pillUno").children().addClass("myActiveClassColorStandard");
        
        
        $("#pillTre").removeClass("myActiveClass");
        $("#pillTre").children().removeClass("myActiveClassColor");
        $("#pillTre").children().addClass("myActiveClassColorStandard");
        
        
        $("#pillDue").addClass("myActiveClass");
        $("#pillDue").children().addClass("myActiveClassColor");
        $("#pillDue").children().removeClass("myActiveClassColorStandard");

        $("#pubblicatiDiv").hide();
        $("#scadutiDiv").hide();
        $("#bozzeDiv").show();   
        
        

        $("#pubblicatiDiv").hide();
        $("#scadutiDiv").hide();
        $("#bozzeDiv").show();       
    }
    else if(dest==3){
        $("#pillUno").removeClass("myActiveClass");
        $("#pillUno").children().removeClass("myActiveClassColor");
        $("#pillUno").children().addClass("myActiveClassColorStandard");
        
        
        $("#pillDue").removeClass("myActiveClass");
        $("#pillDue").children().removeClass("myActiveClassColor");
        $("#pillDue").children().addClass("myActiveClassColorStandard");
        
        
        $("#pillTre").addClass("myActiveClass");
        $("#pillTre").children().addClass("myActiveClassColor");
        $("#pillTre").children().removeClass("myActiveClassColorStandard");
        
        $("#pubblicatiDiv").hide();
        $("#bozzeDiv").hide();
        $("#scadutiDiv").show();
        
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
    
}


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



