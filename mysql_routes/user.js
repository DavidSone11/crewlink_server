
' use strict';
var sequelize = require('sequelize');
var User = require('../mysql_models/Users.js');
var db = require('../mysql_connect/mysqldb.js'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var q = require('q');

var user = {

    getUsers: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'userName'
        };


    },

    creatUser: function (req, res) {

        sequelize.sync().then(function () {
            return User.create({
                firstname: 'janedoe',
                lastname: 'janedoe',
                username: 'janedoe',
                password: 'janedoe'
            });
        }).then(function (result) {
            res.send("YES" + result);
        });




    },
    updateUser: function (req, res) {


    },
    deleteUser: function (req, res) {


    }

}
module.exports = user;