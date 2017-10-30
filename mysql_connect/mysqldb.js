' use strict';
var Sequelize = require('sequelize');

var config = require("../config/sequlizeConfig");
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
        timestamps: true
    },
    logging:     console.log,
    underscored: true
});

sequelize
    .sync({ force: false })
    .then(function () {
        console.log('Connection has been established successfully with mysqlDB.');
    }, function (error) {
        console.log('Connection with mysqlDB failed.', error);
    });


var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;