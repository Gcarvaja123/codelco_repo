"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var ingresos=sequelize.define('ingresos',{
				idIngresos : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Seccion: Sequelize.TEXT,
				Fechaingreso : Sequelize.TEXT,

			},{
				tableName: 'ingresos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return ingresos;


};