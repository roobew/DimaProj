$(document).ready(setField);

function setField(){
    // ICONE HOME SELEZIONATE
    $("#homeIcon").addClass("selectedTab");
    $("#homeText").addClass("selectedTab");    
    // CONTENTPAGEDIV NASCOSTI, TRANNE HOME 
    $(".contentPageDiv").hide();
    $("#homeContent").show();    
    $("#my-menu").mmenu({
            slidingSubmenus: false
          }, {
             // configuration
             classNames: {
                vertical: "expand",
                selected: "active"
             }
          });    
    enableSwiperHome();    
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
        window.scrollTo(0,0);
        if(pressedId=="cercaTab"){
            $("#cercaContent").show();
            console.log("Premuto cerca");             
            var map = new GoogleMap();
            map.initialize();
        }
        else if(pressedId=="affittaTab"){
            
            $("#affittaContent").show();
            console.log("Premuto affitta"); 
            enableSwiperAffitta();
        }
        else if(pressedId=="homeTab"){
            $("#homeContent").show();
            console.log("Premuto home"); 
            enableSwiperHome();
        }
        else if(pressedId=="preferitiTab"){
            $("#preferitiContent").show();
            console.log("Premuto preferiti"); 

            //swipeDetection();
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

function enableSwiperAffitta(){
    var swiperTre = new Swiper ('#swiperAffitta', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            
            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '#nextStepButton',
            prevButton: '#affittaBackButton',
        });   
}

function enableSwiperHome(){
    var swiperUno = new Swiper ('#swiperHome1', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:2500,
            autoplayDisableOnInteraction:false,
          });
          
    var swiperDue = new Swiper ('#swiperHome2', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:3000, 
            autoplayDisableOnInteraction:false,
          });   
}

function swipeDetection(){
    $("li").append("<button class='draggable ui-widget-content'>Button</button>");
    
     $("#ciao").draggable({ revert: "valid" });
    
    $("li").on("swipeleft",function(){
        console.log("SWIPE DETECTED");
        
       
    });
    //$(".ciao").click(function (){console.log("ciao");});

}



