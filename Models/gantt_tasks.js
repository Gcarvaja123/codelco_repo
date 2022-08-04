"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var gantt_tasks=sequelize.define('gantt_tasks',{
				id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	text: Sequelize.STRING,
				start_date : Sequelize.STRING,
				duration : Sequelize.INTEGER,
				progress : Sequelize.FLOAT

			},{
				tableName: 'gantt_tasks',
				freezeTableName: true,
    			timestamps: false
			
			});
	return gantt_tasks;


};