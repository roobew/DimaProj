
var firstTime=true;
var otherTime=false;

$(document).ready(loadContent);


function loadContent(){
    
    $("#sortButton").click(function (){ 
        
        if(firstTime==true){
            $("#messaggiContent").sortable();
            $("#messaggiContent").disableSelection();
            $(this).text("STOP");
            firstTime=false;
            console.log("prima volta");
            otherTime=true;
        }
        else if(otherTime==true){
                $("#messaggiContent").sortable("disable");
                $(this).text("ORDINA");
                otherTime=false;
                console.log("disable");
            }
        else{
                $("#messaggiContent").sortable("enable");
                $(this).text("STOP");
                otherTime=true;
                console.log("enable");
        }
        
    
    });
    
    
}