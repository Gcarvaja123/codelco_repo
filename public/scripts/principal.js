function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}


var app = angular.module('myApp', []);
app.controller('myController', function ($scope, $filter) {
  $scope.Servicionorutinarios = [];
  console.log(local_data[0]);
  for ( a = 0; a < local_data.length; a++){
    var variable =[];
    console.log(local_data[a][7]);
    variable.fechaingreso = local_data[a][0].split(" ")[0];
    variable.descripcion = local_data[a][1];
    variable.especificacion = local_data[a][2]; 
    variable.ingenieria = local_data[a][3]; 
    variable.disponibilidad = local_data[a][4];  
    variable.interferencias = local_data[a][5];
    variable.ventanas = local_data[a][6];
    variable.plazo = String(local_data[a][7]); 
    $scope.Servicionorutinarios.push(variable);
  };

  $scope.edit = function(value){
    $scope.Titulo = $scope.Servicionorutinarios[value].descripcion;
    $scope.Especificacion = $scope.Servicionorutinarios[value].especificacion;
    $scope.Ingenieria = $scope.Servicionorutinarios[value].ingenieria;
    $scope.Disponibilidad = $scope.Servicionorutinarios[value].disponibilidad;
    $scope.Interferencias= $scope.Servicionorutinarios[value].interferencias;
    $scope.Ventanas = $scope.Servicionorutinarios[value].ventanas;
    $scope.Plazo = $scope.Servicionorutinarios[value].plazo;
  };


})