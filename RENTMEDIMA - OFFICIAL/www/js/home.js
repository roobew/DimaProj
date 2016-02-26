
$(document).ready(initializingFunction);


function initializingFunction(){
     
   $("#menu-left").mmenu();
    
    $("#provaUno").click(function (){
        $("#divDue").removeClass("divVisible");
        $("#divUno").addClass("divVisible");
        
        $("#pageRightDiv").toggleClass("go");   
    });
    
    $("#provaDue").click(function (){
        $("#divUno").removeClass("divVisible");
        $("#divDue").addClass("divVisible");
        
        $("#pageRightDiv").toggleClass("go");   
    });
    
    
     
}