var nomeValue,
    cognomeValue,
    passwordValue, 
    confirmPasswordValue, 
    passwordWrongBool=false;

$(document).ready(startModificaDati);

function startModificaDati(){
    
    var iconClicked, 
        inputElement,
        textElement,
        iconCheckedElement,
        blurElementID,
        nomeCliccato, inputBlur;
    
    $(".modificaIconText").on("click", function(){
       //$("#fixedBottomDiv").css("position", "absolute");
       //$("#contentDiv").css("position", "absolute");
       //$("#header").css("position", "absolute");
        
        iconClicked=$(this).attr("id");
        //console.log("Icon clicked è: "+iconClicked);
        
        if(iconClicked=="modificaDatiNomeIcon"){ 
            nomeCliccato="Nome";
        } 
        else if(iconClicked=="modificaDatiCognomeIcon"){
            nomeCliccato = "Cognome";   
        }
        else if(iconClicked=="modificaDatiPasswordIcon"){
            nomeCliccato = "Password";   
        }
        else if(iconClicked=="modificaDatiConfermaPasswordIcon"){
            nomeCliccato = "ConfermaPassword";   
        }
        
        inputElement = $("#modificaDati"+nomeCliccato+"Input");
        textElement = $("#modificaDati"+nomeCliccato+"Text");
        iconCheckedElement = $("#modificaDati"+nomeCliccato+"CheckedIcon");
        
        showInputText(inputElement, textElement, iconCheckedElement);
 
    });
    
    $(".userDataInputText").blur(function (){
        blurElementID=$(this).attr("id");
        //console.log("Blur Element ID è: "+blurElementID);
        
        inputElement = $(this);
        
        if(blurElementID=="modificaDatiNomeInput"){
            inputBlur="Nome";
        }  
        else if(blurElementID=="modificaDatiCognomeInput"){
            inputBlur="Cognome";   
        }
        else if(blurElementID=="modificaDatiPasswordInput"){
            inputBlur="Password";   
        }
        else if(blurElementID=="modificaDatiConfermaPasswordInput"){
            inputBlur="ConfermaPassword";   
        }
        
        textElement = $("#modificaDati"+inputBlur+"Text");
        iconCheckedElement = $("#modificaDati"+inputBlur+"CheckedIcon");
        
        showTextField(inputElement, textElement, iconCheckedElement);
        
    });
    
    
}

function showInputText(myInput, myText, myIcon){
        var lastValue;
    
        myText.hide();
    
        if(myInput.hasClass("passwordClass")==true){
            lastValue = "";
            console.log("VERO");
        }
        else{
            lastValue = myText.text();
            console.log("FALSO");
        }
            
        myInput.val(lastValue);

        myText.hide();
        myInput.show();

        myInput.focus();
        
}
    
function showTextField(myInput, myText, myIcon){
    
    var valueToShow, newValue;
    
    if(myInput.hasClass("passwordClass")==true){
        valueToShow = "**********";
    }
    else{
        valueToShow = myInput.val();
    }

    if(myInput.attr("id")=="modificaDatiPasswordInput"){
        console.log("ID di tipo PASSWORD"); 
        
        if(myInput.val()!=""){
            passwordValue=myInput.val();
            
            myIcon.removeClass("glyphicon-unchecked");
            myIcon.addClass("glyphicon-check");
            
            $("#modificaDatiConfermaPasswordIcon").show();
        }
        
    }
    else if(myInput.attr("id")=="modificaDatiConfermaPasswordInput"){
        console.log("ID di tipo CONFERMA_PASSWORD");
        
        if(myInput.val()!=""){
            confirmPasswordValue=myInput.val();
            
            myIcon.removeClass("glyphicon-unchecked");
            myIcon.addClass("glyphicon-check");
        }
                
        if( passwordValue != confirmPasswordValue ){
            console.log("Password diverse");
            myText.addClass("wrongPasswordValue"); 
            $("#modificaDatiConfermaPasswordTitle").addClass("wrongPasswordValue"); 
            $("#modificaDatiConfermaPasswordTitle").text("Conferma Password *");
            
            if(passwordWrongBool==false){
                myIcon.removeClass("glyphicon-check");
                myIcon.addClass("glyphicon-unchecked");    
            } 
            passwordWrongBool=true;
        }
        else{
            console.log("Password uguali"); 
            
            if(passwordWrongBool==true){
                myText.removeClass("wrongPasswordValue"); 
                $("#modificaDatiConfermaPasswordTitle").removeClass("wrongPasswordValue"); 
                $("#modificaDatiConfermaPasswordTitle").text("Conferma Password");
                passwordWrongBool=false;           
            }
            
            myIcon.removeClass("glyphicon-unchecked");
            myIcon.addClass("glyphicon-check");   
            $("#modificaDatiConfermaPasswordIcon").hide(); 
            
        }
    }
    else if (myInput.attr("id")=="modificaDatiNomeInput") {
        
        if(valueToShow!=""){
            nomeValue=myInput.val();
            
            myIcon.removeClass("glyphicon-unchecked");
            myIcon.addClass("glyphicon-check");
        }
        else{
            valueToShow = nomeValue;   
        }
        //console.log("INPUT è: "+myInput.val());
        //console.log("NOME è: "+nomeValue);
        //console.log("VALUE To Show è: "+valueToShow);
    }
    else if(myInput.attr("id")=="modificaDatiCognomeInput"){
        
        if(valueToShow!=""){
            cognomeValue=myInput.val();
            
            myIcon.removeClass("glyphicon-unchecked");
            myIcon.addClass("glyphicon-check");
        }
        else{
            valueToShow = cognomeValue;   
        }
        console.log("COGNOME è: "+cognomeValue);
    }
    
    
    myText.text(valueToShow);
    myInput.hide();
    myText.show();
}


function showModificaDatiPersonali(){
    
    nascondiBottomBar();
    
    $("#homeTopRow").hide();
    $("#datiPersonaliModificaTopRow").show();
    
    // NASCONDI TUTTI I CONTENTPAGEDIV
    $(".contentPageDiv").hide();
    $("#modificaDatiPersonaliContent").show();
}

function confermaModificaDatiPersonali(){
    mostraBottomBar();
    
    $(".myColumn").find("p").removeClass("selectedTab"); 
    //$(this).find("p").addClass("selectedTab");
    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab");

    $("#datiPersonaliModificaTopRow").hide();
    $("#homeTopRow").show();

    $("#modificaDatiPersonaliContent").hide();
    $("#homeContent").show();
}

function annullaModificaDatiPersonali(){
    mostraBottomBar();
    
    $(".myColumn").find("p").removeClass("selectedTab"); 

    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab");

    $("#datiPersonaliModificaTopRow").hide();
    $("#homeTopRow").show();

    $("#modificaDatiPersonaliContent").hide();
    $("#homeContent").show();
}