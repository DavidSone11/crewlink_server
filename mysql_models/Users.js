"use strict";

var role = require('../mysql_models/Role.js');
var db = require('../mysql_connect/mysqldb.js'),

  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var User = sequelize.define('User', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname:{
    type: Sequelize.STRING,
    defaultValue : "santosh"
  }, 
  lastname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  activation_key: Sequelize.STRING,
  email: Sequelize.STRING,
  extension: Sequelize.STRING,
  is_active: {
   type:Sequelize.BOOLEAN,
   defaultValue : false
  },
  is_delete: {
    type:Sequelize.BOOLEAN,
    defaultValue : false
   },
  mobile_no: Sequelize.STRING,
  telephone_no: Sequelize.STRING,
}, {
    freezeTableName: true
  });

role.hasMany(User, { as: 'user_id' });
sequelize.sync();
module.exports = User;
