
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

function openViewsub6(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub6");
  console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub6");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
function openViewsub7(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub7");
  console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub7");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}



var app = angular.module('myApp', ['zingchart-angularjs']);


app.controller('myController', function ($scope, $filter) {
  $scope.cantidades = [];
  

  
  for ( a = 0; a < local_data.length; a++){
    var variable =[];
    variable.Nombre = local_data[a].nombre;
    variable.numero = local_data[a].cantidad;
    
    $scope.cantidades.push(variable);

  }

})
app.controller("myControllerAsistencia", function($scope, $filter){
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  $scope.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.selectedMonth = ObtenerMes_2(today.getMonth()+1);

  $scope.Totalasistencia = [];
  $scope.cantidadingresos = [];
  $scope.ingresosmes = 0;
  for(b = 0; b< local_data_asistencia.length ; b++){
    $scope.Totalasistencia.push(local_data_asistencia[b]);
    if ($scope.cantidadingresos.includes(local_data_asistencia[b].Fechaingreso) != true){
      $scope.cantidadingresos.push(local_data_asistencia[b].Fechaingreso)
    }
    else if (local_data_asistencia[b].Fechaingreso.split("-")[1] == String(today.getMonth()+1)){
      $scope.ingresosmes+=1;
    }
  }
  $scope.headers = Object.keys($scope.Totalasistencia[0]);
})




app.filter('datefilter',function(){
return function(input,key){
  var new_array = [];
  for(c = 0 ; c<input.length; c++){
    if(input[c].Fechaingreso.split("-")[1]==obtenerMes(key)){
      new_array.push(input[c]);
    }
  }
  return(new_array);
}
});

//filter:searchtxt|
app.controller("myControllerBrocales", function($scope, $filter){
  var today = new Date();
  $scope.Totalbrocalessub6 = [];
  $scope.Totalbrocalessub7 = [];
  $scope.Totalbrocalessub6min = [];
  $scope.Totalbrocalessub7min = [];
  $scope.cantidadTotal = 0;
  var nuevo_array = [];
  var contador = 0;
  var contador_sub7 = 0;
  for(b = 0 ; b < local_data_brocales.length ; b++){
    if(local_data_brocales[b].Sub == "6"){
      $scope.Totalbrocalessub6.push(local_data_brocales[b]);
      contador+= parseInt(local_data_brocales[b].Cantidad);
    }
    if(local_data_brocales[b].Sub == "7"){
      $scope.Totalbrocalessub7.push(local_data_brocales[b]);
      contador_sub7+= parseInt(local_data_brocales[b].Cantidad);
    }
  }
  
  $scope.monthsbrocales = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.selectedMonthBrocales = "Septiembre";
  //$scope.selectedMonthBrocales = ObtenerMes_2(today.getMonth()+1);
  nuevo_array.cantidadTotal = 0;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  $scope.Totalbrocalessub6min.push(nuevo_array);
  $scope.Totalbrocalessub7min.push(nuevo_array);
  var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
    if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
    }
  }
  var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
    if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
    }
  }

  $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0);
  $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0);
  $scope.changeView = function(){
    var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
      if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
      }
    }
    var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
      if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
      }
    }
    $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0);
    $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0);
    
  }

  $scope.modalbrocalessub6 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub6;
  }
  $scope.modalbrocalessub7 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub7
  }


  

})

app.filter('Cantidadfilter',function(){
return function(input,key){
  var nuevo_contador = 0;
  var el_array=[];
  var nuevo_array=[];
  for (a = 0; a < key[0].length ; a++){
    if(key[0][a].Fecha.split("-")[1] == obtenerMes(key[1])){
      nuevo_contador+= parseInt(key[0][a].Cantidad);
    }
  }
  nuevo_array.cantidadTotal = nuevo_contador;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  el_array.push(nuevo_array);
  //console.log(el_array[0]);
  //console.log(input[0]);
  if(el_array[0].cantidadTotal==input[0].cantidadTotal && el_array[0].Dotacion==input[0].Dotacion ){
    
    return input
  }
  return el_array
  
}
});


app.controller('MainController', function($scope) {
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var datos_x_sub7 = [0,0,0,0,0,0,0,0,0,0,0,0];
  for (a = 0; a < $scope.Totalbrocalessub6.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub6[a].Fecha.split("-")[1]));
    datos_x_sub6[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub6[a].Cantidad);
  }
  for (a = 0; a < $scope.Totalbrocalessub7.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub7[a].Fecha.split("-")[1]));
    datos_x_sub7[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub7[a].Cantidad);
  }

  $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,[200,150,250,100,50,230,150,450,230,200,300,150]);
  $scope.myJsonAnualsub7 = Chart_creator(meses,datos_x_sub7,[200,150,250,100,50,230,150,450,230,200,300,150]);
  

});
app.controller('MainController2', function($scope) {
  $scope.myJsonmatrizbar = {
      type : "bar",
      /*title:{
        backgroundColor : "transparent",
        fontColor :"black",
        text : "Hello world"
      },*/
      backgroundColor : "white",
      scaleX: {
        values :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        itemsOverlap: true,
      },
      scaleY: {
        itemsOverlap: true,
      },
      series : [
        {
          values : [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3],
          backgroundColor : "#4DC0CF"
        }
      ]
    };
  $scope.myJsonmatrizpie = {
    type: "pie",
    plot: {
      slice: 50 //to make a donut
    },
    series: [{
      values: [8],
      text: "Completado",
      backgroundColor:"#4DC0CF"

    }, {
      values: [4],
      text: "No completado",
      backgroundColor: "#ededed"

    }]
  };
  
});


function Chart_creator(datosx, valoresdatosx, meta){
  var grafico = {};
  if(meta != 0){
    grafico = {
    backgroundColor: "white",  
    //backgroundColor: "#2bbb9a",
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    /*title: {
      textAlign: 'center',
      text: "Visión anual"
    },*/
    scaleX: {
      values :datosx,
      itemsOverlap: true,
      //maxItems: 8,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [{
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    },
    {
      lineColor:"#4AD8CC",
      text: "Óptimo",
      values:meta
    }]
    }
  }
  else{
    grafico = {
    backgroundColor: "white",
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    /*title: {
      textAlign: 'center',
      text: "Visión anual"
    },*/
    scaleX: {
      values :datosx,
      //maxItems: 8,
      itemsOverlap: true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [{
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    }]
    }
  }
  return grafico
}


function obtenerMes(NombreMes){
  var NumMes = "";
  switch (NombreMes) {
    case "Enero" :
      NumMes="01";
      break;
    case "Febrero" :
      NumMes="02";
      break;
    case "Marzo" :
      NumMes="03";
      break;
    case "Abril" :
      NumMes="04";
      break;
    case "Mayo" :
      NumMes="05";
      break;
    case "Junio" :
      NumMes="06";
      break;
    case "Julio" :
      NumMes="07";
      break;
    case "Agosto" :
      NumMes="08";
      break;
    case "Septiembre" :
      NumMes="09";
      break;
    case "Octubre" :
      NumMes="10";
      break;
    case "Noviembre" :
      NumMes="11";
      break;
    case "Diciembre" :
      NumMes="12";
      break;
  }
  return NumMes
}

function ObtenerMes_2(NumMes){
  var NomMes ="";
  switch (NumMes){
    case 1:
      NomMes="Enero";
      break;
    case 2:
      NomMes="Febrero";
      break;
    case 3:
      NomMes="Marzo";
      break;
    case 4:
      NomMes="Abril";
      break;
    case 5:
      NomMes="Mayo";
      break;
    case 6:
      NomMes="Junio";
      break;
    case 7:
      NomMes="Julio";
      break;
    case 8:
      NomMes="Agosto";
      break;
    case 9:
      NomMes="Septiembre";
      break;
    case 10:
      NomMes="Octubre";
      break;
    case 11:
      NomMes="Noviembre";
      break;
    case 12:
      NomMes="Diciembre";
      break;
  }
  return NomMes
}