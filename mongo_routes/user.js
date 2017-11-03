
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
        var query = User.find({}).sort("userName");
        query.paginate(options, function(err, results) {
            if(err)
                throw err;
               else{
                return res.json(results);
               }
            
            
          });


    },

    creatUser: function (req, res) {

        User.create({
            firstname: 'janedoe',
            lastname: 'janedoe',
            username: 'janedoe',
            password: 'janedoe'
        }, function (err, results) {

            if (err)
                throw err;
            else {
                return res.json(results);
            }
        });



    },
    updateUser: function (req, res) {


    },
    deleteUser: function (req, res) {


    }

};
module.exports = user;