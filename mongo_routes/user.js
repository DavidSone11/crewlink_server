
' use strict';
var mongoose = require('mongoose');
var User = require('../mongo_models/users.js');
var q = require('q');
require('mongoose-query-paginate');

var user = {

    getUsers: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'userName'
        };
        var query = User.find({}).sort(options.order);
        query.paginate(options, function (err, results) {
            if (err)
                throw err;
            else {
                return res.json(results);
            }


        });


    },

    creatUser: function (req, res) {
        User.create({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            roleCode: req.body.roleCode,
            userProfile: req.body.userProfile
        }, function (err, user) {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200);
        });
    },
updateUser: function (req, res) {


},
deleteUser: function (req, res) {


}

};
module.exports = user;