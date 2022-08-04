var app = angular.module('myApp', []);
var socket = io.connect('http://localhost:4000');
app.controller('myController', function ($scope, $filter) {

        // JSON ARRAY TO POPULATE TABLE.
    /*$scope.requirementsArray =
    [
        { 'name': 'Total Eclipse', 'descripcion': 'Agniezka Hollan', "recursos": "30", "urgencia": "70", "date" : "2021/10/10","datestart":"hola" },
        { 'name': 'My Left Foot', 'descripcion': 'Jim Sheridan', "recursos": "50", "urgencia": "20", "date" : "2021/12/10" ,"datestart":"as"},
        { 'name': 'Forest Gump', 'descripcion': 'Robert Zemeckis', "recursos": "100", "urgencia": "30" , "date" : "2021/10/23" ,"datestart":"qwq"},
        { 'name': 'tristisimo', 'descripcion': 'una descripcion', "recursos": "100", "urgencia": "30" , "date" : "2021/10/23","datestart":"ww" }
    ];
	*/
    $scope.requirementsArray =[];
	  for(a = 0; a < local_data.length ; a++){
	    $scope.requirementsArray.push(local_data[a]);
	  }

    $scope.acceptedArray = [] ;

    $scope.removeRow = function (indexx) {
  		var arrMovie = [];
  		var aux_index = 0;
        angular.forEach($scope.requirementsArray, function (value) {
            if(aux_index!=indexx){
            	arrMovie.push(value);
            }
            aux_index+=1; 
        });
        $scope.requirementsArray = arrMovie;
	};

	$scope.addRow = function () {
            if ($scope.Nombre != undefined && $scope.Descripcion != undefined &&  $scope.Urgencia!= undefined) {
            	let ts = Date.now();
				let date_ob = new Date(ts);
				let date = date_ob.getDate();
				let month = date_ob.getMonth() + 1;
				let year = date_ob.getFullYear();

                var requisito = [];
                requisito.Nombre = $scope.Nombre;
                requisito.Descripcion = $scope.Descripcion;
                requisito.Urgencia = $scope.Urgencia;
                requisito.Fecha_ingreso = String(date)+"/"+String(month)+"/"+String(year);
                //requisito.datestart = "";

                socket.emit("prueba",{nombre : $scope.name, desc : $scope.descripcion});
                $scope.requirementsArray.push(requisito);

                // CLEAR TEXTBOX.
                $scope.Name = null;
                $scope.Descripcion = null;
                $scope.Urgencia = null;
            }
        };


    $scope.Orderbyvalue = function(){
    	var aux_arr =[];
    	i = 0;
    	angular.forEach($scope.requirementsArray, function(value){
    		aux_arr.push(parseInt($scope.requirementsArray[i].Urgencia));
    		i+=1;
    	});
		aux_arr.sort(function(a, b) {
  			return b - a;
		});

		var new_array = [];
		for (c = 0; c < aux_arr.length ; c++){
			for(d=0 ; d <$scope.requirementsArray.length ; d++){
				if(aux_arr[c] === parseInt($scope.requirementsArray[d].Urgencia)){
					new_array.push($scope.requirementsArray[d]);
					$scope.requirementsArray.splice(d,1);
					break;
				}
			}

		}
		console.log(new_array);
		$scope.requirementsArray = new_array;
	};

	$scope.Orderbydate = function(){
		let ts = Date.now();
		let date_ob = new Date(ts);
		let date = date_ob.getDate();
		let month = date_ob.getMonth() + 1;
		let year = date_ob.getFullYear();
		

		var counting_dates = $scope.requirementsArray.length;
		var counting = 0;
		var index_value = 0;
		var final_array = [];
		while($scope.requirementsArray.length != 1){
			var best_date = String(year)+ "/" + String(month)+"/"+String(date);
			for(a = 0 ; a < $scope.requirementsArray.length; a++){
				var g1 = new Date(best_date);
				var g2 = new Date($scope.requirementsArray[a].Fecha_ingreso);
				if(g2<=g1){
					best_date = $scope.requirementsArray[a].Fecha_ingreso;
					index_value = a;

				}
			};
			counting+=1;
			final_array.push($scope.requirementsArray[index_value]);
			$scope.requirementsArray.splice(index_value,1);
			best_date = String(year)+ "/" + String(month)+"/"+String(date);
		}
		if($scope.requirementsArray.length == 1){
			final_array.push($scope.requirementsArray[0]);
		}
		$scope.requirementsArray = final_array;
		
	};

	$scope.Acceptrequirements = function(){
		var arrRequirements = [];
		var arrnotaccepted = [];
		var i = 0;
		console.log($scope.requirementsArray);
        angular.forEach($scope.requirementsArray, function (value) {
            if (value.Accept && value.datestart && value.datefinish) {
            	var g1 = $filter('date')(value.datestart, "yyyy-MM-dd");
            	var g2 = $filter('date')(value.datefinish, "yyyy-MM-dd");
				value.Fecha_inicio = String(g1);
				value.Fecha_termino = String(g2);
				console.log(g1);
				console.log(g2);
                $scope.acceptedArray.push(value);
                socket.emit("agregar_fechas", value);
                i+=1;
            }
            else{
            	arrnotaccepted.push(value);            	
            	console.log("ingresa fechas");
            	ilegal=true;
            }
        });
        $scope.requirementsArray = arrnotaccepted;
        //$scope.acceptedArray = arrRequirements;
        console.log($scope.acceptedArray);

	};
	$scope.Submitdate = function(){
		var new_array = [];
		angular.forEach($scope.acceptedArray, function(value){
			var g1 = $filter('date')(value.datestart, "yyyy/MM/dd");
			value.Fecha_inicio = String(g1);
			new_array.push(value);
			console.log(g1);
		})
		$scope.acceptedArray = new_array;
		console.log($scope.acceptedArray);
	};

	$scope.Nuevorequisito = function(){
		location.href = "http://localhost:4000/nuevorequisito";
	},

	$scope.edit = function(value){
		$scope.Titulo = $scope.requirementsArray[value].Nombre;


	},

	$scope.close = function(){
   		

	}

	$scope.probando = function(){
		socket.emit('Prueba');
	}
});

