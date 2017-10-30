"use strict";

var role = require('../mysql_models/Role.js');
var db = require('../mysql_connect/mysqldb.js'),

  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var User = sequelize.define('user', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

role.hasMany( User, { as: 'user_id' } );


sequelize.sync();
module.exports = User;
