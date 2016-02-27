//var newValue, valueToShow;

$(document).ready(startModificaDati);

function startModificaDati(){
   /*
    var lastValue, inputElement, textElement, elementToOverride;

    $(".modificaIconText").on("click", function(){
        
        inputElement = $(this).siblings(".userDataInputText");
    
        textElement = $(this).siblings(".userDataText").hide();
        
        if(inputElement.hasClass("passwordClass")==true){
            lastValue = "";
            console.log("VERO");
        }
        else{
            lastValue = textElement.text();
            console.log("FALSO");
        }
            
        inputElement.val(lastValue);
        console.log("Last value è: "+lastValue);

        textElement.hide();
        inputElement.show();

        inputElement.focus();
        
    });
    
    $(".userDataInputText").blur(function (){
        console.log("Blur EVENT");
        // InputElement è $(this)
        
        textElement = $(this).siblings(".userDataText");
        
        if($(this).hasClass("passwordClass")==true){
            valueToShow = "**********";
           
        }
        else{
            valueToShow = $(this).val();
        }
        
        if($(this).attr("id")=="passwordUtenteInput"){
            $("#confermaPasswordModificaIcon").show();   
        }
        
        newValue = $(this).val();
        console.log("Input Value è: "+newValue);
        
        textElement.text(valueToShow);
        $(this).hide();
        textElement.show();
        
        
    });
    */
    
    var iconClicked;
    var inputElement;
    var textElement;
    var iconCheckedElement;
    var blurElementID;
    
    $(".modificaIconText").on("click", function(){
        iconClicked=$(this).attr("id");
        console.log("Icon clicked è: "+iconClicked);
        
        if(iconClicked=="modificaDatiNomeIcon"){
            inputElement = $("#modificaDatiNomeInput");
            textElement = $("#modificaDatiNomeText");
            iconCheckedElement = $("#modificaDatiNomeCheckedIcon");
        }
        
        showInputText(inputElement, textElement, iconCheckedElement);
 
    });
    
    $(".userDataInputText").blur(function (){
        blurElementID=$(this).attr("id");
        console.log("Blur Element ID è: "+blurElementID);
        
        inputElement = $(this);
        if(blurElementID=="modificaDatiNomeInput"){
            
            textElement = $("#modificaDatiNomeText");
            iconCheckedElement = $("#modificaDatiNomeCheckedIcon");
        }  
        
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
        console.log("Last value è: "+lastValue);

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

    if(myInput.attr("id")=="passwordUtenteInput"){
        $("#confermaPasswordModificaIcon").show();   
    }

    newValue = myInput.val();
    console.log("Input Value è: "+newValue);

    myText.text(valueToShow);
    myInput.hide();
    myText.show();
}