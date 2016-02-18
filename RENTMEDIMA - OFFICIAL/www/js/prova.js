$(document).ready(startLoad);

function startLoad(){
  $("#autoHeight-mmenu").mmenu({
         // options
      
        autoHeight: true,
        offCanvas: {
            position: "bottom",
            zposition: "front"
         }
        
      });
}