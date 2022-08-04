const express = require('express'); //Import the express dependency
var path = require('path');
const app = express();
app.io = require('socket.io')();
var modelo = require('./Models');
var bodyParser = require('body-parser');
require("date-format-lite");
var upload_2 = require("express-fileupload");
app.use(upload_2());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
var index = require('./routes/index');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', index);






app.io.on('connection', function(socket){
	/*modelo.requisito.findAll({}).then(function(data){
		var string=JSON.stringify(data);
        var json=JSON.parse(string);
		console.log(json);
	})*/

	socket.on('prueba',function(status){
		modelo.requisito.create({
			Nombre : status.nombre,
			Descripcion : status.desc
		})
		console.log("agregado")
    }),

    socket.on("SendmeValues", function(status){
    	console.log("aca llego");
    	modelo.requisito.findAll({}).then(function(data){
			var string=JSON.stringify(data);
	        var json=JSON.parse(string);
	        socket.emit("SendingValues", json);
		})
    })

    socket.on("agregar_fechas", function(status){
    	console.log(status);
    	var fecha_1 = status.Fecha_inicio;
    	var fecha_2 = status.Fecha_termino;

    	var duracion = parseInt(fecha_2.split("-")[2])-parseInt(fecha_1.split("-")[2]);
    	console.log(duracion);

    	modelo.gantt_tasks.create({
    		text : status.Descripcion,
    		start_date : status.Fecha_inicio,
    		duration : duracion,
    		progress : 0
    	})
    })



}) 

module.exports = app;