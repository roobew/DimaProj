var replaceWith = $('<input name="temp" type="text" />'),
    connectWith = $('input[name="hiddenField"]');
var firstModify=true;

$(document).ready(function (){
    $("#nuovoAnnuncioDiv").hide();
    
    $("#btnNuovoAnnuncio").button();
    
    $("#btnNuovoAnnuncio").click(function (){
        $(this).after("<form ><input type='text' class='annuncioDiv'> </input></form>");  
        //$('.annuncioDiv').first().inlineEdit(replaceWith, connectWith);
        $('.annuncioDiv').first().focus();
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
    /*$("#provaFocus").change(function(){
        if(firstModify==true){
            $(this).d
        }
    });
    */
});

$.fn.inlineEdit = function(replaceWith, connectWith) {

    $(this).hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $(this).click(function() {

        var elem = $(this);

        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();

        replaceWith.blur(function() {

            if ($(this).val() != "") {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }

            $(this).remove();
            elem.show();
        });
    });
};