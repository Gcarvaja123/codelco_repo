"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var brocales=sequelize.define('brocales',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Fecha: Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Ubicacion : Sequelize.TEXT,
				Unidad : Sequelize.TEXT,
				Actividad : Sequelize.TEXT,
				Observaciones : Sequelize.TEXT,
				Cantidad : Sequelize.TEXT,
				Sub : Sequelize.TEXT
			},{
				tableName: 'brocales',
				freezeTableName: true,
    			timestamps: false
			
			});
	return brocales;


};