' use strict';
var Sequelize = require('sequelize');
var config = require("../config/sequlizeConfig");

/**
 * Represents a sql Connection function.
 * @constructor
 * @param - no parameter
 */

var sqlConnection = function sqlConnection() {

    var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
        operatorsAliases: false,
        host: config.db.host,
        dialect: 'mysql', //|'sqlite'|'postgres'|'mssql'
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        //logging:     true,
        underscored: true
    });
    // load models                 
    var models = [
        'Users',
    ];
    models.forEach(function (model) {
        module.exports[model] = sequelize.import(__dirname + '/../mysql_models/' + model);
    });
    sequelize
        .sync({ force: true })
        .then(function () {
            console.log('Connection has been established successfully with mysqlDB.');
        }, function (error) {
            console.log('Connection with mysqlDB failed.', error);
        });
    return sequelize;
}

module.exports = sqlConnection;