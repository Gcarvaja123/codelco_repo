var notebooks = angular.module('notebooks', []);
var socket = io.connect('http://localhost:4000');
new_requirements = [];
//var string=JSON.stringify(local_data);
//var json=JSON.parse(string);
console.log(local_data);




  

notebooks.controller('RequirementListCtrl', function($scope) {

  $scope.RequirementsArray = [];
  for(a = 0; a < local_data.length ; a++){
    console.log(local_data[a]);
    $scope.RequirementsArray.push(local_data[a]);
  }

  $scope.Completerequirement = function(Therequirement){
    for (b = 0; b < $scope.RequirementsArray.length ; b ++ ){
      if($scope.RequirementsArray[b].Nombre === Therequirement){
        $scope.Nombre = $scope.RequirementsArray[b].Nombre;
        $scope.Descripcion = $scope.RequirementsArray[b].Descripcion;
      }
    }
  }


  /*socket.emit("SendmeValues");

  
  
  socket.on("SendingValues", function(status){
  console.log(status[0].Nombre);
    
  for (a = 0 ; a < status.length ; a++){
      var Requirements = [];

      Requirements.nombre = status[a].Nombre;
      Requirements.descripcion = status[a].Descripcion;
      $scope.RequirementsArray.push(Requirements);



  }
  });*/
  
  
  
  



  

  
  /*$scope.notebooks = [
    {"name": "Lenovo",
     "procesor": "Intel i5",
     "age": 2011},
    {"name": "Toshiba",
     "procesor": "Intel i7",
     "age": 2010},
    {"name": "Toshiba",
     "procesor": "Intel core 2 duo",
     "age": 2008},
    {"name": "HP",
     "procesor": "Intel core 2 duo",
     "age": 2012}
  ];
  $scope.orderList = "name";*/



  
});