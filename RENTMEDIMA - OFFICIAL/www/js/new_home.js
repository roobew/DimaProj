$(document).ready(setField);

function setField(){
    // ICONE HOME SELEZIONATE
    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab");
    
    // CONTENTPAGEDIV NASCOSTI, TRANNE HOME 
    $(".contentPageDiv").hide();
    $("#homeContent").show();
    
    
            /*var swiperUno = $('#swiperContainer1').swiper({
                mode: 'horizontal',
                watchActiveIndex: true,
                loop: true,
                onSlideChangeStart: function (swiper) {
                    console.log('slide change start - before');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //before Event use it for your purpose
                },
                onSlideChangeEnd: function (swiper) {
                    console.log('slide change end - after');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //after Event use it for your purpose
                    if (swiper.activeIndex == 1) {
                        //First Slide is active
                        console.log('First slide active')
                    }
                }
            });*/
        
           /* var swiperDue = $('#swiperContainer2').swiper({
                mode: 'horizontal',
                watchActiveIndex: true,
                loop: true,
                onSlideChangeStart: function (swiper) {
                    console.log('slide change start - before');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //before Event use it for your purpose
                },
                onSlideChangeEnd: function (swiper) {
                    console.log('slide change end - after');
                    console.log(swiper);
                    console.log(swiper.activeIndex);
                    //after Event use it for your purpose
                    if (swiper.activeIndex == 1) {
                        //First Slide is active
                        console.log('First slide active')
                    }
                }
            });
    */
         
    
    $(".myColumn").click(function(){
        // RIMUOVI TUTTI I TAB SELEZIONATI
        $(".myColumn").find("p").removeClass("selectedTab");
    
        var pressedId=$(this).attr("id");
        
        // NASCONDI TUTTI I CONTENTPAGEDIV
        $(".contentPageDiv").hide();
        
        if(pressedId=="cercaTab"){
            $("#cercaContent").show();
            console.log("Premuto cerca");   
        }
        else if(pressedId=="affittaTab"){
            $("#affittaContent").show();
            console.log("Premuto affitta"); 
        }
        else if(pressedId=="homeTab"){
            $("#homeContent").show();
            console.log("Premuto home"); 
        }
        else if(pressedId=="preferitiTab"){
            $("#preferitiContent").show();
            console.log("Premuto preferiti"); 
        }
        else if(pressedId=="messaggiTab"){
            $("#messaggiContent").show();
            console.log("Premuto messaggi"); 
        }
        else{
            console.log("error");   
        }
        $(this).find("p").addClass("selectedTab");
    });

    
}
