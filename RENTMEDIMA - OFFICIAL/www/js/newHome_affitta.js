var annuncioID_toDelete, modificaCliccato=false;;

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
    console.log("DEntro affit.js");
    // **** EVENTI DI ANNUNCIO_HOME PAGE
;

    
    $("#pillUno").on("tap", function(){
        change_tabs(1, true);
    });
    
    $("#pillDue").on("tap", function(){
        change_tabs(2, true);
    });
    
    
    $("#btnNuovoAnnuncio").click(function (){
        console.log("Nuovo Annuncio");
        getData();
        
        $("#homeTopRow").hide();
        $("#nuovoAnnuncioTopRow").show();
        
        nascondiBottomBar();
        
        $("#affittaContent").fadeOut();
        $("#affittaContent_creaAnnuncio").fadeIn();
           
        if(modificaCliccato==true){
            premiTastoModifica();   
        }
        
        });
    
    $("#modificaAnnuncioHome").on("click", function(){
        
        premiTastoModifica(); 
        
    });    
      
    /*$(".annuncioParteUno").on("tap", function(){
        console.log("clickato annuncio");
        if(dettaglioMapInit==false){
            //drawMap("dettaglioMap", false);
            drawMapDettaglio();
            dettaglioMapInit=true;
        }
        
        //Mostra top bar corretta
        $("#homeTopRow").hide();
        $("#dettaglioAnnuncioTopRow_daAffitta").show();
        
        nascondiBottomBar();
        
        $("#pageDettaglioContent").fadeIn();
        $("#affittaContent").fadeOut();
        
        $(".annuncioListElement").removeClass("go");
         
    });*/
   
    
    
    $(".eliminaAffittaAnnuncio").click(function(){
        console.log("Elimina ANNUNCIO"); 
        
        annuncioID_toDelete=$(this).closest(".annuncioListElement").attr("id");
        
        console.log("ID VALE: "+annuncioID_toDelete);
    });
    
    
    // devo dare l'id al nuovo annuncio bozza, altrimenti non lo cancella
    $("#deleteAnnuncioMenuCancella").on("tap", function(){
        
        console.log("TO DELETE VALE_ "+annuncioID_toDelete);
        
        $("#"+annuncioID_toDelete).addClass("remove");
        
        setTimeout(function(){ 
            $("#"+annuncioID_toDelete).remove();
        }, 150);
        
    });
    
    
    // **** EVENTI DI NUOVO_ANNUNCIO PAGE
    $("#backMenuRowEliminaButton").on("click", function (){
        
        clearAllField();
        //navigator.camera.cleanup(onSuccess, onFail);
        //console.log("ANNULLO TUTTO");
        $("#nuovoAnnuncioTopRow").hide();
        $("#homeTopRow").show();
        
        mostraBottomBar();
        
        $("#affittaContent_creaAnnuncio").fadeOut();
        $("#affittaContent").fadeIn();
    });
    
    $("#backMenuRowSalvaButton").on("click", function (){
        console.log("SALVA BOZZA");
        
        $("#nuovoAnnuncioTopRow").hide();
        $("#homeTopRow").show(); 
        
        mostraBottomBar();
        
        saveBozzaToDB();
        pickBozze();
        
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
    
    $(".nuovoAnnuncioBox").click(function (){
            
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
            $("#postiLettoStanzaInput").prop("disabled",true); 
            
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
    
    $(".backToAnnuncioContent").click(function (){
           
        $("#annullaNuovoAnnuncioButton").show();
        
        var boxDetailId=$(this).closest(".nuovoAnnuncioDetailContent").attr("id");
        var newValue;
        
        if(boxDetailId=="nuovoAnnuncioTitoloDetail"){
            
            newValue=$("#titoloInput").val();  
            //$("#nuovoAnnuncioTitoloDetail").hide();
            //$("#nuovoAnnuncioContent").show();
            
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
            $("#nuovoAnnuncioContent").show();
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
             
            console.log("NEW VALUE: "+newValue);
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
           
             $("#nuovoAnnuncioContent").show();
        }
        
    });
       
    $("#pubblicaAnnuncioButton").on("click", function(){
        //if(checkCorrectValue()==true){
        //salvo sul db
        saveAnnuncioToDB()
        //ricarico pickannunci
        pickAnnunci();
        $("#affittaContent_creaAnnuncio").fadeOut();
        $("#nuovoAnnuncioTopRow").hide();
        
        $("#affittaContent").fadeIn();  
        $("#homeTopRow").show();  
        
        
        //$("#affittaContent .annuncioDiv").first().before(divToAdd);
        //}
    });
    
    
    
    // **** EVENTI DI MODIFICA_ANNUNCIO PAGE
    $("#modificaAnnuncioMenuRowAnnullaModificaButton").on("tap", function(){
        
        //modificoAnnuncio=false;
        
        $("#modificaAnnuncioTopRow").hide();
        $("#homeTopRow").show();
        
        mostraBottomBar();
        
        $("#affittaContent_dettaglioAnnuncio").fadeOut();
        $("#affittaContent").fadeIn();
        
        console.log("ANNULLA MODIFICHE");
    });
    
    $("#modificaAnnuncioMenuRowConfermaButton").on("tap", function(){
        
        //modificoAnnuncio=false;
        
        $("#modificaAnnuncioTopRow").hide();
        $("#homeTopRow").show();
        
        $("#contentDiv").css("height","83vh");
        $("#fixedBottomDiv").show();
        
        $("#affittaContent_dettaglioAnnuncio").fadeOut();
        $("#affittaContent").fadeIn();
        
        console.log("SALVA MODIFICHE");
    });
    
    $(".modificaAnnuncioBox").click(function (){
        
        $("#annullaModificaAnnuncioButton").hide();
        
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
            $("#modifica_postiLettoStanzaInput").prop("disabled",true);
            
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
        console.log("pippo");
        $("#modifica_stanzaCondivisaRadio").prop("checked",true);
        
        
    });
    
    $(".modifica_backToAnnuncioContent").click(function (){
       
        $("#annullaModificaAnnuncioButton").show();
        
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
            $("#modificaAnnuncioContent").show();
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
            
        }
        
    });
    
    $("#modifica_tipologiaInput").change(function (){
        
        var yourChoice=$("#modifica_tipologiaInput :radio:checked").val();  
    
        console.log("La tua scelta è: "+yourChoice);
        if(yourChoice=="Stanza Condivisa"){
            console.log("*** ABILITO");
            $("#modifica_postiLettoStanzaInput").prop("disabled",false);   
        }
        else{
            console.log("*** DISABILITO");
            $("#modifica_postiLettoStanzaInput").prop("disabled",true);
        }    
    });
    
    
    // **** EVENTI DI CERCA
     $("#cercaPillUno").on("tap", function(){
        change_tabs(1,false);
    });
    
     $("#cercaPillDue").on("tap", function(){
        change_tabs(2, false);
    });
    
    
});

function setAnnuncioValue(annuncioClicked){
    annuncio = JSON.parse(localStorage.getItem("annunci"))[annuncioClicked];
    if(dettaglioMapInit==false){
        //drawMap("dettaglioMap", false);
       // drawMapDettaglio();
        dettaglioMapInit=true;
    }

    //Mostra top bar corretta
    $("#homeTopRow").hide();
    $("#dettaglioAnnuncioTopRow_daAffitta").show();

    nascondiBottomBar();
    //console.log("ciao");
    creaPageDettaglioContent(annuncio);
    $("#pageDettaglioContent").fadeIn();
    $("#affittaContent").fadeOut();

    $(".annuncioListElement").removeClass("go");
}

function setBozzaValue(annuncioClicked){
    bozza = JSON.parse(localStorage.getItem("bozze"))[annuncioClicked];
    if(dettaglioMapInit==false){
        //drawMap("dettaglioMap", false);
       // drawMapDettaglio();
        dettaglioMapInit=true;
    }

    //Mostra top bar corretta
    $("#homeTopRow").hide();
    $("#dettaglioAnnuncioTopRow_daAffitta").show();

    nascondiBottomBar();
    //console.log("ciao");
    creaPageDettaglioContent(bozza);
    $("#pageDettaglioContent").fadeIn();
    $("#affittaContent").fadeOut();

    $(".annuncioListElement").removeClass("go");
}

function creaPageDettaglioContent(an){
    //console.log(an);
    $("#pageDettaglioContent").html("");
    $("#pageDettaglioContent").append(
        
        "<div id='dettaglioMap' style='height:8em; width:100%;'></div>"+
"                <div class='row pageDettaglioTitleRow'>"+
"                    <div class='col-xs-12' id='pageDettaglioTitleColumn'>"+
"                        <h5 class='annuncioTextTitle'> "+an.titolo+"</h5>"+
"                    </div>"+
"                </div> "+
"                <div class='row pageDettaglioTitleRow'>"+
"                    <div class='col-xs-12 dettaglioStarColumn'>"+
"                        <span class='glyphicon glyphicon-star starElement' aria-hidden='true'></span>  "+
"                        <span class='glyphicon glyphicon-star starElement' aria-hidden='true'></span>  "+
"                        <span class='glyphicon glyphicon-star starElement' aria-hidden='true'></span>  "+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioBox' id='pageDettaglioZonaRow'>"+
"                    <div class='row'>"+
"                        <div class='col-xs-12'>"+
"                           <h6> <span id='dettaglioZonaText'>"+an.zona+"</span>  </h6>"+
"                        </div>"+
"                    </div>"+
"                    <div class='row pageDettaglioTitleRow'>"+
"                        <div class='col-xs-12'>"+
"                            <h6>"+an.indirizzo+"</h6> "+
"                        </div>"+
"                    </div>"+
"                </div>"+
"                <div class='row photoswipe' id='pageDettaglioPhotoswipeRow'>"+
"                    <img class='img-responsive previewImage foto'/>"+
"                    <img class='img-responsive previewImage foto' />"+
"                    <img class='img-responsive previewImage foto'/>"+
"                    <img class='img-responsive previewImage foto'/>"+
"                    <img class='img-responsive previewImage foto'/>"+
"                    <img class='img-responsive previewImage foto'/>"+
"                </div>"+
"                <br>"+
"                <div class='row pageDettaglioInfoRow marginFirstRow'>"+
"                    <div class='col-xs-3'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Locali: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-3 col-xs-offset-4'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> " +an.num_locali+ " </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioInfoRow' >"+
"                    <div class='col-xs-3'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Superficie: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-3 col-xs-offset-4'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> "+an.superficie+" mq </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioInfoRow'>"+
"                    <div class='col-xs-3'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Piano: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-3 col-xs-offset-4'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> "+an.piano+" </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioInfoRow'>"+
"                    <div class='col-xs-3'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Tipo: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-5 col-xs-offset-3'>"+
"                        <h6 class='pageDettaglioTextLineHeight'>"+an.tipo+"</h6>"+
"                    </div>"+
"                </div>"+
"                 <div class='row pageDettaglioInfoRow'>"+
"                    <div class='col-xs-7'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Posti Letto Stanza: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-3'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> "+an.posti_letto+" </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioInfoRow'>"+
"                    <div class='col-xs-7'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Posti Letto Totali: </b></h5>"+
"                    </div>"+
"                    <div class='col-xs-3'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> "+an.posti_letto_tot+" </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioMezziRow marginFirstMezziRow'>"+
"                    <div class='col-xs-2'>"+
"                        <img src='img/bus.png' class='iconImage'/>"+
"                    </div>"+
"                    <div class='col-xs-9 col-xs-offset-1'>"+
"                        <h6 style='line-height:2em;'> "+an.autobus+"</h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioMezziRow'>"+
"                    <div class='col-xs-2'>"+
"                        <img src='img/metro.png' class='iconImage'/>"+
"                    </div>"+
"                    <div class='col-xs-9 col-xs-offset-1'>"+
"                        <h6 style='line-height:2em;'>"+an.metro+"</h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioMezziRow'>"+
"                    <div class='col-xs-2'>"+
"                        <img src='img/treno.png' class='iconImage'/>"+
"                    </div>"+
"                    <div class='col-xs-9 col-xs-offset-1'>"+
"                        <h6 style='line-height:2em;'> "+an.treno+"</h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row pageDettaglioMezziRow'>"+
"                    <div class='col-xs-2'>"+
"                        <img src='img/tram.png' class='iconImage'/>"+
"                    </div>"+
"                    <div class='col-xs-9 col-xs-offset-1'>"+
"                        <h6 style='line-height:2em;'> "+an.tram+" </h6>"+
"                    </div>"+
"                </div>"+
"                <div class='row' id='pageDettaglioDEscrizioneRow'>"+
"                    <div class='col-xs-12'>"+
"                       <h6 id='pageDettaglioDescrizioneText'>"+
"                            <i>"+an.descrizione+"</i>"+
"                        </h6>   "+
"                    </div>"+
"                </div>"+
"                 <div class='row pageDettaglioPrezzoRow'>"+
"                    <div class='col-xs-8'>"+
"                        <h5 class='pageDettaglioTextLineHeight'> <b> Prezzo </b><small>(mensile, a persona): </small></h5>"+
"                    </div>"+
"                    <div class='col-xs-2 col-xs-offset-1'>"+
"                        <h6 class='pageDettaglioTextLineHeight'> "+an.prezzo+"€ </h6>"+
"                    </div>"+
"                </div>   "+
"                <div style='height:2em;'></div>"
    );
    
}

function checkValue(){
    
}

function clearAllField(){
    $("#titoloPreview").text("-");
    $("#titoloCheckedIcon").removeClass("glyphicon-check");
    $("#titoloCheckedIcon").addClass("glyphicon-unchecked");
    $("#titoloInput").val("");
    
    $("#prezzoPreview").text("-");
    $("#prezzoCheckedIcon").removeClass("glyphicon-check");
    $("#prezzoCheckedIcon").addClass("glyphicon-unchecked");
    $("#prezzoInput").val("");
    
    $("#descrizionePreview").text("-");
    $("#descrizioneCheckedIcon").removeClass("glyphicon-check");
    $("#descrizioneCheckedIcon").addClass("glyphicon-unchecked");
    $("#descrizioneInput").val("");
    
    $("#fotoPreview").hide();
    $("#fotoCheckedIcon").removeClass("glyphicon-check");
    $("#fotoCheckedIcon").addClass("glyphicon-unchecked");
    $("#smallImage").attr("src", "");
    
    $("#numLocaliPreview").text("-");
    $("#numLocaliCheckedIcon").removeClass("glyphicon-check");
    $("#numLocaliCheckedIcon").addClass("glyphicon-unchecked");
    $("#numLocaliInput").val("");
    
    $("#superficiePreview").text("-");
    $("#superficieCheckedIcon").removeClass("glyphicon-check");
    $("#superficieCheckedIcon").addClass("glyphicon-unchecked");
    $("#superficieInput").val("");
    
    $("#tipologiaPreview").text("-");
    $("#tipologiaCheckedIcon").removeClass("glyphicon-check");
    $("#tipologiaCheckedIcon").addClass("glyphicon-unchecked");
    $("#postiLettoStanzaInput").val("");
    $('#tipologiaInput input[type=radio]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#postiLettoPreview").text("-");
    $("#postiLettoCheckedIcon").removeClass("glyphicon-check");
    $("#postiLettoCheckedIcon").addClass("glyphicon-unchecked");
    $("#postiLettoInput").val("");
    
    $("#pianoPreview").text("-");
    $("#pianoCheckedIcon").removeClass("glyphicon-check");
    $("#pianoCheckedIcon").addClass("glyphicon-unchecked");
    $("#pianoInput").prop('selectedIndex',0);
    
    $("#zonaPreview").text("-");
    $("#zonaCheckedIcon").removeClass("glyphicon-check");
    $("#zonaCheckedIcon").addClass("glyphicon-unchecked");
    $('#zonaInput input[type=radio]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#indirizzoPreview").text("-");
    $("#indirizzoCheckedIcon").removeClass("glyphicon-check");
    $("#indirizzoCheckedIcon").addClass("glyphicon-unchecked");
    $("#indirizzoInput").val("");
    
    $("#metroPreview").text("-");
    $("#metroCheckedIcon").removeClass("glyphicon-check");
    $("#metroCheckedIcon").addClass("glyphicon-unchecked");
    $('#metroInput input[type=checkbox]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#tramPreview").text("-");
    $("#tramCheckedIcon").removeClass("glyphicon-check");
    $("#tramCheckedIcon").addClass("glyphicon-unchecked");
    $('#tramInput input[type=checkbox]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#busPreview").text("-");
    $("#busCheckedIcon").removeClass("glyphicon-check");
    $("#busCheckedIcon").addClass("glyphicon-unchecked");
    $('#busInput input[type=checkbox]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#passantePreview").text("-");
    $("#passanteCheckedIcon").removeClass("glyphicon-check");
    $("#passanteCheckedIcon").addClass("glyphicon-unchecked");
    $('#passanteInput input[type=checkbox]').each(function() {
        $(this).prop( "checked", false ).checkboxradio('refresh');  
    });
    
    $("#altreFotoPreview").hide();
    $("#altreFotoCheckedIcon").removeClass("glyphicon-check");
    $("#altreFotoCheckedIcon").addClass("glyphicon-unchecked");
    $(".miniaturaImage").attr("src", "");
    
}

function backToNuovoAnnuncioFunction(value, elementPreview, elementCheckedIcon){    
    
    if(value!=""){
        elementPreview.text(value);
        
        elementCheckedIcon.removeClass("glyphicon-unchecked");
        
        elementCheckedIcon.addClass("glyphicon-check");
    }
    else{
        elementPreview.text("-");

        elementCheckedIcon.removeClass("glyphicon-check");
        elementCheckedIcon.addClass("glyphicon-unchecked");
       
    }
    
    
    //$(".nuovoAnnuncioDetailContent").fadeOut();
    $(".nuovoAnnuncioDetailContent").hide();
    //$("#nuovoAnnuncioContent").fadeIn();
    $("#nuovoAnnuncioContent").show();
  
    
    
}


function modifica_backToNuovoAnnuncioFunction(value, elementPreview, elementCheckedIcon){
    
    if(value!=""){
        elementPreview.text(value);
        
        elementCheckedIcon.removeClass("glyphicon-unchecked");
        
        elementCheckedIcon.addClass("glyphicon-check");
    }
    else{
        elementPreview.text("-");

        elementCheckedIcon.removeClass("glyphicon-check");
        elementCheckedIcon.addClass("glyphicon-unchecked");
       
    }

    $(".modificaAnnuncioDetailContent").hide(); 
    $("#modificaAnnuncioContent").show();
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

function premiTastoModifica(){
 
    if(modificaCliccato==false){
            modificaCliccato=true;
            $("#modificaAnnuncioHome").text("Fine"); 
            
    }
    else{
            modificaCliccato= false;
            $("#modificaAnnuncioHome").text("Modifica");
    }
    $(".annuncioListElement").toggleClass("go");
}


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

function change_tabs(dest, affittaBool){
    if(modificaCliccato==true){
        premiTastoModifica();   
    }
    
    if(affittaBool){    
        if(dest==1){
            console.log("pubblicati");
            pickAnnunci();
            
        }
        else if(dest==2){
            console.log("bozze");
            pickBozze();
          
        }
        
    }
    else{
         if(dest==1){
            $("#cercaPillDue").removeClass("myActiveClass");
            $("#cercaPillDue").children().removeClass("myActiveClassColor");
            $("#cercaPillDue").children().addClass("myActiveClassColorStandard");

            $("#cercaPillUno").addClass("myActiveClass");
            $("#cercaPillUno").children().addClass("myActiveClassColor");
            $("#cercaPillUno").children().removeClass("myActiveClassColorStandard");

            $("#cercaVicinanzeDiv").hide();
            $("#cercaZonaDiv").show();
        } 
        else if(dest==2){
            $("#cercaPillUno").removeClass("myActiveClass");
            $("#cercaPillUno").children().removeClass("myActiveClassColor");
            $("#cercaPillUno").children().addClass("myActiveClassColorStandard");

            $("#cercaPillDue").addClass("myActiveClass");
            $("#cercaPillDue").children().addClass("myActiveClassColor");
            $("#cercaPillDue").children().removeClass("myActiveClassColorStandard");

            $("#cercaZonaDiv").hide();
            $("#cercaVicinanzeDiv").show();
        }   
    }
    
}



function pickAnnunci(){
    console.log("pickannunci");
    myUser= JSON.parse(localStorage.getItem("userData"));
    console.log(myUser);
    myUrl=  "http://rentme.altervista.org/pickAnnunci.php?" +                
                "idUser="       +  myUser.uRentMe ;
    console.log("--------------------------");
    console.log("url:" + myUrl);
        xhttp = new XMLHttpRequest;
        xhttp.open("GET", myUrl, false);
        xhttp.send();   
        annunci=xhttp.response;
        if(JSON.parse(annunci)!=null){
            console.log("presi annunci");
            localStorage.setItem("annunci",annunci);
            jAnnunci=JSON.parse(annunci);
            $("#pubblicatiDiv").html("");
            
            for(i=0;i<jAnnunci.length;i++)
                $("#pubblicatiDiv").append(
                            "<div class='row annuncioListElement'>"+
                            "<div class='annuncioParteUno' onclick='setAnnuncioValue(" + i+ ");'>"+
                            "    <h5 class='titoloAffittaAnnuncio'>"+jAnnunci[i].titolo+"</h5>"+
                            "</div>"+
                            "<div class='annuncioParteDue'>"+
                            "    <span class='glyphicon glyphicon-pencil iconaOpzioneAnnuncio' onclick='modificaAffittaAnnuncio(1," + i+ ");' aria-hidden='true'></span>"+         
                            "     <a href='#deleteAnnuncio-mmenu'>        "+
                            "        <span class='glyphicon glyphicon-trash iconaOpzioneAnnuncio' onclick='eliminaAffittaAnnuncio(1," + i+ ");' aria-hidden='true'>"+
                            "        </span>"+
                            "     </a>   "+
                            "</div>"+
                            "</div>"
                );

            //console.log(JSON.parse(annunci).length)
            //console.log(JSON.parse(annunci));
            
            //setTimeout(function(){
            //            window.location.href="new_home.html";
            //},50);                          
        }
    $("#pillDue").removeClass("myActiveClass");
    $("#pillDue").children().removeClass("myActiveClassColor");
    $("#pillDue").children().addClass("myActiveClassColorStandard");

    $("#pillUno").addClass("myActiveClass");
    $("#pillUno").children().addClass("myActiveClassColor");
    $("#pillUno").children().removeClass("myActiveClassColorStandard");

    $("#bozzeDiv").hide();
    $("#pubblicatiDiv").show();
} 

function pickBozze(){
    console.log("pickBozze");
    myUser= JSON.parse(localStorage.getItem("userData"));
    console.log(myUser);
    myUrl=  "http://rentme.altervista.org/pickBozze.php?" +                
                "idUser="       +  myUser.uRentMe ;
    console.log("--------------------------");
    console.log("url:" + myUrl);
        xhttp = new XMLHttpRequest;
        xhttp.open("GET", myUrl, false);
        xhttp.send();   
        bozze=xhttp.response;
    console.log("provo bzz");
    console.log("bzz: "+JSON.parse(bozze));
        if(JSON.parse(bozze)!=null){
            console.log("presi bozze");
            localStorage.setItem("bozze",bozze);
            jBozze=JSON.parse(bozze);
            $("#bozzeDiv").html("");
            for(i=0;i<jBozze.length;i++)
                $("#bozzeDiv").append(
                            "<div class='row annuncioListElement'>"+
                            "<div class='annuncioParteUno' onclick='setBozzaValue(" + i+ ");'>"+
                            "    <h5 class='titoloAffittaAnnuncio'>"+jBozze[i].titolo+"</h5>"+
                            "</div>"+
                            "<div class='annuncioParteDue'>"+
                            "    <span class='glyphicon glyphicon-pencil iconaOpzioneAnnuncio modificaAffittaAnnuncio' aria-hidden='true'></span>"+         
                            "     <a href='#deleteAnnuncio-mmenu'>        "+
                            "        <span class='glyphicon glyphicon-trash iconaOpzioneAnnuncio eliminaAffittaAnnuncio' aria-hidden='true'>"+
                            "        </span>"+
                            "     </a>   "+
                            "</div>"+
                            "</div>"
                );

            //console.log(JSON.parse(annunci).length)
            //console.log(JSON.parse(annunci));
            
            //setTimeout(function(){
            //            window.location.href="new_home.html";
            //},50);                          
        }
    $("#pillUno").removeClass("myActiveClass");
    $("#pillUno").children().removeClass("myActiveClassColor");
    $("#pillUno").children().addClass("myActiveClassColorStandard");

    $("#pillDue").addClass("myActiveClass");
    $("#pillDue").children().addClass("myActiveClassColor");
    $("#pillDue").children().removeClass("myActiveClassColorStandard");

    $("#pubblicatiDiv").hide();
    $("#bozzeDiv").show();  
} 

function saveAnnuncioToDB(){
    console.log("saveAnnuncioToDB");
    console.log($("#titoloPreview").text());
    myUser= JSON.parse(localStorage.getItem("userData"));
    //console.log(myUser);
    myUrl=  "http://rentme.altervista.org/saveAnnuncio.php?" +                
                "titolo="       + $("#titoloPreview").text() +   
                "&descrizione="       +  $("#descrizionePreview").text()  + 
                "&tipo="       +  $("#tipologiaPreview").text() + 
                "&indirizzo="       + $("#indirizzoPreview").text()  + 
                "&num_locali="       +   $("#numLocaliPreview").text()+ 
                "&piano="       +  $("#pianoPreview").text() + 
                "&posti_letto="      +  $("#postiLettoStanzaInput").val()  + 
                "&posti_letto_tot="       +  $("#postiLettoPreview").text() +
                "&superficie="       +  $("#superficiePreview").text() + 
                "&zona="       +   $("#zonaPreview").text() + 
                "&autobus="       +   $("#busPreview").text() + 
                "&metro="       +   $("#metroPreview").text()+ 
                "&treno="       + $("#passantePreview").text()  + 
                "&tram="       + $("#tramPreview").text()  + 
                "&prezzo="       + $("#prezzoPreview").text()  + 
                "&id_utente="       + myUser.uRentMe ;
    console.log(myUrl);
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
}

function saveBozzaToDB(){
    console.log("saveBozzaToDB");
    console.log($("#titoloPreview").text());
    myUser= JSON.parse(localStorage.getItem("userData"));
    //console.log(myUser);
    myUrl=  "http://rentme.altervista.org/saveBozza.php?" +                
                "titolo="       + $("#titoloPreview").text() +   
                "&descrizione="       +  $("#descrizionePreview").text()  + 
                "&tipo="       +  $("#tipologiaPreview").text() + 
                "&indirizzo="       + $("#indirizzoPreview").text()  + 
                "&num_locali="       +   $("#numLocaliPreview").text()+ 
                "&piano="       +  $("#pianoPreview").text() + 
                "&posti_letto="      +  $("#postiLettoStanzaInput").val()  + 
                "&posti_letto_tot="       +  $("#postiLettoPreview").text() +
                "&superficie="       +  $("#superficiePreview").text() + 
                "&zona="       +   $("#zonaPreview").text() + 
                "&autobus="       +   $("#busPreview").text() + 
                "&metro="       +   $("#metroPreview").text()+ 
                "&treno="       + $("#passantePreview").text()  + 
                "&tram="       + $("#tramPreview").text()  + 
                "&prezzo="       + $("#prezzoPreview").text()  + 
                "&id_utente="       + myUser.uRentMe ;
    console.log(myUrl);
    xhttp = new XMLHttpRequest;
    xhttp.open("GET", myUrl, false);
    xhttp.send();
}

function modificaAffittaAnnuncio(type,clicked){
    console.log("MODIFICA ANNUNCIO");
        
        premiTastoModifica();
        
        $("#homeTopRow").hide();
        $("#modificaAnnuncioTopRow").show();
        
        nascondiBottomBar();
    
             
        $("#affittaContent").hide();
        $("#affittaContent_dettaglioAnnuncio").show();
        inserisciDatiModificaAnnuncio(type,clicked);   
}

function inserisciDatiModificaAnnuncio(type,clicked){
        if(type==1)
            str="annunci";
        else
            str="bozze";
        console.log(str);
        tmp=JSON.parse(localStorage.getItem(str))[clicked];
        console.log(tmp);
       ///*
    
        //console.log("--------------------"+$("#titoloPreview").text());
        $("#modifica_titoloPreview").text(tmp.titolo);
        $("#modifica_descrizionePreview").text(tmp.descrizione);
        $("#modifica_tipologiaPreview").text(tmp.tipo);
        $("#modifica_indirizzoPreview").text(tmp.indirizzo);
        $("#modifica_numLocaliPreview").text(tmp.num_locali);
        $("#modifica_pianoPreview").text(tmp.piano);
        $("#postiLettoStanzaInput").val(tmp.posti_letto);
        $("#modifica_postiLettoPreview").text(tmp.posti_letto_tot);
        $("#modifica_superficiePreview").text(tmp.superficie);
        $("#modifica_zonaPreview").text(tmp.zona); 
        $("#modifica_busPreview").text(tmp.autobus); 
        $("#modifica_metroPreview").text(tmp.metro);
        $("#modifica_passantePreview").text(tmp.treno);
        $("#modifica_tramPreview").text(tmp.tram); 
        $("#modifica_prezzoPreview").text(tmp.prezzo); 
        
        $("#modifica_titoloInput").val(tmp.titolo); 
        $("#modifica_descrizioneInput").val(tmp.descrizione);
        
        switch(tmp.tipo){
            case "Appartamento":
                console.log("app");
                $("#modifica_appartamentoRadio").prop("checked",false);
                $("#modifica_stanzaSingolaRadio").prop("checked",true);
                $("#modifica_stanzaCondivisaRadio").prop("checked",false);
                break;
            case "Stanza Singola":
                console.log("sts");
                $("#modifica_appartamentoRadio").prop("checked",false);
                $("#modifica_stanzaSingolaRadio").prop("checked",true);
                $("#modifica_stanzaCondivisaRadio").prop("checked",false);
                break;
            case "Stanza Condivisa":
                console.log("stc");
               //$("#modifica_appartamentoRadio").prop("checked",false);
            //    $("#modifica_stanzaSingolaRadio").prop("checked",false);
              //  $("#modifica_stanzaCondivisaRadio").prop("checked",true);
                $('input:radio[name=modifica_tipologia]')[2].checked = true;
                break;
            default:
                console.log(tmp.tipo);
                break;

        }
    
    
        $("#modifica_indirizzoInput").val(tmp.indirizzo);
        $("#modifica_numLocaliInput").val(tmp.num_locali);
        $("#modifica_pianoInput").val(tmp.piano);
        $("#postiLettoStanzaInput").val(tmp.posti_letto);
        $("#modifica_postiLettoInput").val(tmp.posti_letto_tot);
        $("#modifica_superficieInput").val(tmp.superficie);
        $("#modifica_zonaInput").val(tmp.zona); 
        $("#modifica_busInput").val(tmp.autobus); 
        $("#modifica_metroInput").val(tmp.metro);
        $("#modifica_passanteInput").val(tmp.treno);
        $("#modifica_tramInput").val(tmp.tram); 
        $("#modifica_prezzoInput").val(tmp.prezzo);
        //*/

    
}



