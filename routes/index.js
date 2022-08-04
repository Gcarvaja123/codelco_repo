var express = require('express');
var controllers = require ('.././Controllers');
var router = express.Router();
const multer = require("multer");
const path = require('path');
const fileUpload = require("express-fileupload");
const reader = require('xlsx');
const fss = require("fs");






router.get('/', controllers.UserController.getSistemanuevo);
router.get('/copia', controllers.UserController.getSistemanuevocopia);
//router.get('/',controllers.UserController.getIndex);
//router.get('/data', controllers.UserController.getPrueba);
router.get('/vistaprueba2', controllers.UserController.getPrueba2);
router.get('/nuevorequisito', controllers.UserController.getNuevorequisito);
router.post('/nuevorequisito', controllers.UserController.postNuevorequisito);
router.post('/', controllers.UserController.postSistemanuevo);
router.get('/prueba', controllers.UserController.getprueba);
router.get('/dashboard', controllers.UserController.getdashboard);
/*router.post("/", async (req,res,next)=>{
	//try{
		const file = req.files.avatar;
		console.log(file);
		const savePath = path.join(__dirname,"uploads",file.name)
		await file.mv(savePath);
	} catch (error){
		console.log(error);
	}
	leerExcel(file.name);
});*/
//router.post("/", controllers.UserController.postSistemanuevo);
//router.get('/probando', controllers.UserController.probando);
//router.get('/Vistageneral', controllers.UserController.vistageneral);

/*function leerExcel(ruta){
	
	const workbook = reader.readFile(path.join(__dirname,"uploads", ruta));
	const workbooksheet = workbook.SheetNames;
	const sheet  = workbooksheet[0];
	const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
	
	console.log(dataExcel[0]["Columna2"]);
	
}*/





module.exports = router;