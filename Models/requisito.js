"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var requisito=sequelize.define('requisito',{
				id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Nombre: Sequelize.STRING,
				Descripcion : Sequelize.TEXT,
				Urgencia : Sequelize.INTEGER,
				Fecha_ingreso : Sequelize.STRING,
				Fecha_inicio : Sequelize.STRING,
				Fecha_termino : Sequelize.STRING,
				Aceptada : Sequelize.INTEGER

			},{
				tableName: 'requisito',
				freezeTableName: true,
    			timestamps: false
			
			});
	return requisito;


};