


var db = require('../mysql_connect/mysqldb.js'),
sequelize = db.sequelize,
Sequelize = db.Sequelize;

var role = sequelize.define('role', {
    name: Sequelize.STRING
});


module.exports = role;