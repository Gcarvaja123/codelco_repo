
var modelo = require('.././Models');
let googlesheet = require('.././spreadsheet')
const xlsx = require("xlsx");
const formidable = require("formidable");
const reader = require('xlsx');
const fss = require("fs");
const path = require('path');
var sizeof = require('object-sizeof');

function leerExcel(ruta){
  
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;
}




module.exports = {

  getdashboard : function(req, res, next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("dashboard", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
    
  },

	getSistemanuevo : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevo", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },
  getSistemanuevocopia : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevocopia", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },

  getIndex : function(req,res,next){
    modelo.requisito.findAll({
      where :{
          Aceptada:0
      }
    }).then(function(data){
        console.log("hola");
        var string=JSON.stringify(data);
        var json=JSON.parse(string);
        var requisitos =[];
        for (a = 0 ; a < json.length ; a++){
          var Requirements = [];
          Requirements.Nombre = json[a].Nombre;
          Requirements.Descripcion = json[a].Descripcion;
          Requirements.Urgencia = json[a].Urgencia;
          Requirements.Fecha_ingreso = json[a].Fecha_ingreso;
          requisitos.push(Requirements);  
        }
        return res.render("index",{
          Requisitosnoaceptados : data
        });
    })

	},

  postAsistencianueva : async(req,res,next)=>{
    console.log("asistencia nueva");

  },



  postSistemanuevo : async (req,res,next)=>{

    datos_1 = Object.keys(req.files);
    for( d = 0 ; d < Object.keys(req.files).length ; d++){
      if (datos_1[d] == "Asistencia"){
        if (req.files["Asistencia"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Asistencia"].length ; e++){
            JoinAsistencia(req.files["Asistencia"][e]);
          }
        }
        else{
          console.log("entré a undefined");
          JoinAsistencia(req.files["Asistencia"]);
        }  
      }
      else if (datos_1[d] == "Brocales") {
        if (req.files["Brocales"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Brocales"].length ; e++){
            JoinBrocales(req.files["Brocales"][e]);
          }
        }
        else{
          console.log("entré a undefined");
          JoinBrocales(req.files["Brocales"]);
        }
      }   
    }
    if(req.body.ingreso == "planmatriz"){
      const file = req.files.avatar;
      console.log(file);
      const savePath = path.join(__dirname,"../",'public','uploads',file.name);
      //const savePath = path.join(__dirname,"uploads",file.name)
      await file.mv(savePath);
      var datos = leerExcel(file.name);
      let keys = Object.keys(datos[0]);
      for (a = 0 ; a < keys.length ; a++){
        modelo.graficos.create({
          nombre : keys[a],
          cantidad : datos[0][keys[a]]
        })
        //console.log(keys[a]);
      }
    }

    else if(req.body.ingreso == "disciplina"){
      const file = req.files.disciplina;
      const savePath = path.join(__dirname,"../",'public','uploads',file.name);
      await file.mv(savePath);
      var datos = leerExcel(file.name);
      console.log(Object.keys(datos[0])[0].split(" ")[1]);

    }
    

  },

	getPrueba : function (req, res ,next){
    modelo.gantt_tasks.findAll({
    }).then(function(rows){
      var string=JSON.stringify(rows);
      var json=JSON.parse(string);
      console.log(json);
      return res.render("vistaprueba",{
        data : json
      });

    });


    
  
	},

  getprueba : function (req, res ,next){
    return res.render("probando");



    
  
  },

	getPrueba2: function(req,res,next){
		return res.render("vistaprueba2");
	},

	getNuevorequisito : function(req,res,next){
    modelo.requisito.findAll({}).then(function(data){
        var string=JSON.stringify(data);
        var json=JSON.parse(string);
        var nuevosrequerimientos =[]
        for (a = 0 ; a < json.length ; a++){
          var Requirements = [];
          Requirements.nombre = json[a].Nombre;
          Requirements.descripcion = json[a].Descripcion;
          nuevosrequerimientos.push(Requirements);
        }
        console.log("aca presentod cosas");
        console.log(nuevosrequerimientos);
        return res.render("nuevorequisito",{
          RequirementsArrays : data
        });
            
    })    	    
	},

  postNuevorequisito : function(req, res, next){

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    if(month<10){
      moth = "0"+String(month)
    }
    let year = date_ob.getFullYear();
    var date_string = String(year)+"/"+String(month)+"/"+String(date);
    modelo.requisito.create({
      Nombre : req.body.nombrerequisito,
      Descripcion : req.body.descripcion,
      Urgencia : req.body.opcion,
      Fecha_ingreso : date_string,
      Fecha_inicio : "",
      Fecha_termino : "",
      Aceptada : 0
    })
    return res.redirect('/');
  }, 
  
  /*probando : async (req, res ,next)=>{
    try{
      var registros = await googlesheet.AccederSpreadsheet();
      console.log(registros);

    }
    catch(err){
      console.log(err);
    }
    console.log("hola");
    const obtenerDatos = async (req, res )=> {
      registros = await googlesheet.AccederSpreadsheet();
      console.log(registros);
    }

    return res.render("probando",{
        registros : registros
    });
  },

  vistageneral : async (req, res, next)=>{

    try{
      var registros = await googlesheet.AccederSpreadsheet();

    }
    catch(err){
      console.log(err);
    }

    var envio =[];
    envio.push(registros);
    return res.render("paginaprincipal",{
      registros:registros
    });
  }*/

};

async function JoinAsistencia(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcel(file.name);
  let keys = Object.keys(datos[0]);
  var nombre_sector = "sector";
  var fecha = Object.keys(datos[0])[0].split(" ")[1];
  for( a = 1; a < Object.keys(datos).length; a++){
    let keys = Object.keys(datos[a]);
    if(keys.length>5){
      nombre_sector = datos[a][keys[0]];
      modelo.asistencia.create({
        Nombre : datos[a]["__EMPTY"],
        Rut : datos[a]["__EMPTY_1"],
        Cargo : datos[a]["__EMPTY_2"],
        Turno : datos[a]["__EMPTY_3"],
        Sector : nombre_sector,
        Fechaingreso : fecha,
      })
    }
    else{
      modelo.asistencia.create({
        Nombre : datos[a]["__EMPTY"],
        Rut : datos[a]["__EMPTY_1"],
        Cargo : datos[a]["__EMPTY_2"],
        Turno : datos[a]["__EMPTY_3"],
        Sector : nombre_sector,
        Fechaingreso : fecha,
      })
    }
  }
}

async function JoinBrocales(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcel(file.name);
      //console.log(datos);
      //var date = new Date(Math.round((datos[2]["__EMPTY"] - (25567 + 1)) * 86400 * 1000));
      //var converted_date = date.toISOString().split('T')[0];
      //console.log(converted_date);
  var Fecha = "";
  var Turno = "";
  var Ubicacion = "";
  var Unidad = "";
  var Cantidad = "";
  var Actividad = "";
  var Observaciones = "";
  var Sub = "";
  console.log(datos[3]["LIMPIEZA DE BROCALES FEBRERO 2022"] == null);
  console.log(datos);
  for( a = 1; a < Object.keys(datos).length; a++){
    let keys  = Object.keys(datos[a]);
      if(datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"] != null){
        console.log((datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"]));
        var date = new Date(Math.round((datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"] - (25567 + 1)) * 86400 * 1000));
        console.log(date);
        var converted_date = date.toISOString().split('T')[0];
        Fecha = converted_date;
      }
      if(datos[a]["__EMPTY"] != null){
        Turno = datos[a]["__EMPTY"];
      }
      if(datos[a]["__EMPTY_1"] != null){
        Ubicacion = datos[a]["__EMPTY_1"];
      }
      if(datos[a]["__EMPTY_2"] != null){
        Unidad = datos[a]["__EMPTY_2"];
      }
      if(datos[a]["__EMPTY_3"] != null){
        Cantidad = datos[a]["__EMPTY_3"];
      }
      if(datos[a]["__EMPTY_4"] != null){
        Actividad = datos[a]["__EMPTY_4"];
      }
      if(datos[a]["__EMPTY_5"] != null){
        Observaciones = datos[a]["__EMPTY_5"];
      }
      if(datos[a]["__EMPTY_6"] != null){
        Sub = datos[a]["__EMPTY_6"];
      }
      modelo.brocales.create({
        Fecha : Fecha,
        Turno : Turno,
        Ubicacion : Ubicacion,
        Unidad : Unidad,
        Cantidad : Cantidad,
        Actividad : Actividad,
        Observaciones : Observaciones,
        Sub : Sub
      })        
  }
}