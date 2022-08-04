"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var asistencia=sequelize.define('asistencia',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Nombre: Sequelize.TEXT,
				Rut : Sequelize.TEXT,
				Cargo : Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Sector : Sequelize.TEXT,
				Fechaingreso : Sequelize.TEXT,
			},{
				tableName: 'asistencia',
				freezeTableName: true,
    			timestamps: false
			
			});
	return asistencia;


};