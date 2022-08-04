"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var graficos=sequelize.define('graficos',{
				id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	nombre: Sequelize.TEXT,
				cantidad : Sequelize.INTEGER,

			},{
				tableName: 'graficos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return graficos;


};