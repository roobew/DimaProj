/*
var metroList = angular.module("Metro", []);
metroList.controller("MetroCtrl", function($scope, $http) {

    $http.get("http://rentme.altervista.org/serverFile/getinfo.php").
    success(function(data, status, headers, config) {
      $scope.metro = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
     $scope.remove = function(index) {
                        $scope.items.splice(index, 1);
                    }
});

angular.bootstrap(document.getElementById("divMetro"),['Metro']);*/

function getData(){

     $.ajax({
            method: "POST",
            crossDomain: true, //localhost purposes
            url: "http://rentme.altervista.org/serverFile/getinfo.php", //Relative or absolute path to file.php file
            success: function(response) {
                /*
                var i=0;
                    //console.log(JSON.parse(response));
                    var elem=JSON.parse(response);
                    console.log(elem[0].length);
                
                    while(i<elem[0].length){
                        console.log(elem[0][i].zona);
                        i++;
                    }
                
                    i=0;
                    while(i<elem[1].length){
                        console.log(elem[1][i].metro);
                        i++;
                    }
                
                    i=0;
                    while(i<elem[2].length){
                        console.log(elem[2][i].passante);
                        i++;
                    }
              */
                
                //console.log(JSON.parse(response));
                var elem=JSON.parse(response);
                
                $.each(elem, function( index, value ) {
                    console.log( index + ": " + value.metro );
                    
                   /* var metroToAppend="<label for='"+value.metro+"'></label>"+value.metro+"<input type='checkbox' name='elencoMetro' id='"+value.metro+"' value='"+value.metro+"'>";
                    
                    $("#metroInput").append(metroToAppend);*/
                });
                /*
                console.log("elem :"+elem);
                console.log("elem di 0 :"+elem[0]);
                console.log("elem punto metro :"+elem.metro);
                console.log("elem di zero punto metro :"+elem[0].metro);*/
               // var metroToAppend="<label for=''></label><input type='checkbox' name='elencoMetro' id='' value=''>
               // $("")
            },
            error: function(request,error)
            {
                console.log("Error");
            }
        });
}

